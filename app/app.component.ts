import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

<<<<<<< HEAD
import {SpaceService} from './spaces/space.service'
=======
import {SpaceService} from './spaces/space.service';
import {SpaceComponent} from './spaces/space.component';

// import {ChatRoomService} from './chat/chat-room.service';
>>>>>>> 08aa3c50e8481fb6a1912268df4d8d9b7a2f6a6c

import * as io from 'socket.io-client';


@Component({
  selector: 'my-app',
  moduleId: module.id,
  templateUrl: 'app.component.html',
  //styleUrls: ['../public/css/main.css'],
  encapsulation: ViewEncapsulation.None,
<<<<<<< HEAD
  providers: [ToastsManager, {provide: 'io', useValue: io}, SpaceService]
=======
  providers: [ToastsManager, {provide: 'io', useValue: io}, SpaceService],
  // directives:[SpaceComponent]
>>>>>>> 08aa3c50e8481fb6a1912268df4d8d9b7a2f6a6c

})
export class AppComponent {


constructor(){}

foo(){
  console.log('clicked');
  // this.spaceComponent.setStore('s');
  
}
  
}