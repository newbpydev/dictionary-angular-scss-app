import { Routes } from '@angular/router';

import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { DefinitionSectionComponent } from './pages/definition-section/definition-section.component';

export const routes: Routes = [
  {
    path: 'search/:keyword',
    component: DefinitionSectionComponent,
    title: `Dictionary | :keyword`,
  },
  {
    path: '',
    redirectTo: '/search/keyboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
