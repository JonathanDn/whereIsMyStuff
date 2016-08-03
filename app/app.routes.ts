import { PLATFORM_DIRECTIVES } from '@angular/core';
import {AppComponent} from './app.component';

import {StoreDiagramComponent} from './spaces/store-diagram.component';
import {StoreListComponent} from './spaces/store-list.component';
import {SpaceComponent} from './spaces/space.component';
import {SpaceEditComponent} from './spaces/space-edit.component';
import {EditItemComponent} from './spaces/edit-item.component';


import { RouterConfig, ROUTER_DIRECTIVES, provideRouter } from '@angular/router';

const routes: RouterConfig = [
  { path: '', component: SpaceComponent },
  { path: 'edit', component: SpaceEditComponent },
  { path: 'edit-item', component: EditItemComponent },
  { path: 'edit/:id', component: SpaceEditComponent }
];

export const ROUTER_PROVIDERS = [
  provideRouter(routes),
  {provide: PLATFORM_DIRECTIVES, useValue: ROUTER_DIRECTIVES, multi: true}
];
