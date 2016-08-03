import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import {SpaceService} from './spaces/space.service'

import * as io from 'socket.io-client';


@Component({
  selector: 'my-app',
  moduleId: module.id,
  templateUrl: 'app.component.html',
  //styleUrls: ['../public/css/main.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ToastsManager, {provide: 'io', useValue: io}, SpaceService]

})
export class AppComponent { 
  foo(){
    console.log('clicked');
    
  }
}