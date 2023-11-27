import { EMPTY, Observable, Subscription, takeUntil } from 'rxjs';

import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { SharedService } from '../../../shared.service';
import { WindowSizeDirective } from '../../../window-size.directive';
import { SvgIconComponent } from '../icons/svg-icon/svg-icon.component';

@Component({
  selector: 'app-play-button',
  standalone: true,
  imports: [CommonModule, SvgIconComponent, WindowSizeDirective],
  template: `
    <audio #audioPlayer controls class="audio">
      <source [src]="audioUrl" type="audio/mp3" />
      Your browser does not support audio element.
    </audio>

    <app-svg-icon
      icon="play"
      [height]="height.toString()"
      [width]="width.toString()"
      class="play-btn"
      id="play-btn"
      appWindowSize
      (sizeChange)="onWindowSizeChange($event)"
      (click)="playAudio()"
    />
  `,
  styles: `
    .audio {
      display: none;
    }
  `,
})
/* -------------------------------------------------------------------------- */
/*                             PlayButtonComponent                            */
/* -------------------------------------------------------------------------- */
export class PlayButtonComponent
  implements AfterViewInit, OnDestroy, OnInit, OnChanges
{
  height = 48;
  width = 48;

  private sharedService = inject(SharedService);
  subscription: Subscription = EMPTY.subscribe();
  audioSubscription: Subscription = EMPTY.subscribe();

  audioUrl: SafeUrl | undefined = '';
  audioPlayer: HTMLAudioElement | undefined;

  @ViewChild('audioPlayer') audioPlayerRef: ElementRef | undefined;

  constructor(
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.subscription = this.sharedService.dictionaryResults$.subscribe(
      (result) => {
        if (result instanceof Array) {
          const audioUrl = result[0].phonetics.find(
            (phon) => phon.sourceUrl?.length
          );
          this.updateAudioUrl(audioUrl?.audio);
        }
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('in changes');

    if (changes['audioUrl']) {
      console.log('in the if audioUrl changes');
    }
  }

  ngAfterViewInit(): void {
    this.audioPlayer = this.audioPlayerRef?.nativeElement;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onWindowSizeChange(size: { height: number; width: number }) {
    if (768 < size.width) {
      this.width = 75;
      this.height = 75;
    } else {
      this.width = 48;
      this.height = 48;
    }
  }

  playAudio() {
    this.audioPlayer?.load();
    this.audioPlayer?.play();
  }

  updateAudioUrl(newUrl: string | undefined) {
    const sanitizedUrl = newUrl
      ? this.sanitizer.bypassSecurityTrustUrl(newUrl)
      : undefined;

    this.audioUrl = sanitizedUrl;

    this.zone.run(() => {
      this.cdr.detectChanges();
    });
  }
}
