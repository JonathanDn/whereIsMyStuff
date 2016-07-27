import { PLATFORM_DIRECTIVES } from '@angular/core';
import {AppComponent} from './app.component';

import {StoreListComponent} from './spaces/store-list.component';
import {SpaceComponent} from './spaces/space.component';
import {SpaceEditComponent} from './spaces/space-edit.component';
// import {ChatRoomComponent} from './chat/chat-room.component';
import { RouterConfig, ROUTER_DIRECTIVES, provideRouter } from '@angular/router';

const routes: RouterConfig = [
  { path: '', component: SpaceComponent },
  // { path: 'space', component: StoreListComponent },
  { path: 'space/edit', component: SpaceEditComponent },
  { path: 'space/edit/:id', component: SpaceEditComponent }
  // { path: 'space/:id/:name', component: SpaceComponent },
  // { path: 'chat', component: ChatRoomComponent }

];

export const ROUTER_PROVIDERS = [
  provideRouter(routes),
  {provide: PLATFORM_DIRECTIVES, useValue: ROUTER_DIRECTIVES, multi: true}
];
