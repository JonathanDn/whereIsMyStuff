import { Component, OnInit } from '@angular/core';

import {SpaceComponent} from './space.component'
import {SpaceModel} from './space.model';
import {SpaceService} from './space.service'

@Component({
  moduleId: module.id,
  selector: 'store-diagram',
  inputs: ['stores'],
  styleUrls: [`space.css`],
  template: `
          <section>
            <h2>Diagram</h2>
            <div class="storeContainer">
              <div class="store" *ngFor="let store of stores ">{{store.name}}</div>
            </div>
            <!--<a routerLink="/space/{{space.id}}/{{space.name}}">-->

          </section>
          `

})
export class StoreDiagramComponent implements OnInit {

  private stores : any;
  // private space: any;
  constructor( private spaceService: SpaceService) { 
    // this.space = this.spaceService.getSpace();
    // // console.log('this.space in store:', this.space);
    
    // this.stores = this.space.stores;
    // console.log('this.stores ', this.stores );
    
  }

  ngOnInit() { 
    // console.log('stores in Diagram:',this.stores);
  }

}
