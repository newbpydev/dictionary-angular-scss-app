import { Routes } from '@angular/router';

import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { DefinitionSectionComponent } from './pages/definition-section/definition-section.component';

export const routes: Routes = [
  {
    path: 'search',
    component: DefinitionSectionComponent,
  },
  {
    path: '',
    redirectTo: '/search',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
