import { Component, OnInit } from '@angular/core';
import {SpaceComponent} from './space.component'
import {SpaceModel} from './space.model';
import {SpaceService} from './space.service';

@Component({
  moduleId: module.id,
  selector: 'store-diagram',
  inputs: ['stores'],
  directives: [],
  template: `
          <section>
            <h2>Diagram</h2>
            <!--{{ stores | json}}-->
            <div class="storeContainer">
              <div [className]="getClassOfStore(store)" *ngFor="let store of stores">
                <div class="storeDiagramCardName">{{store.name}}</div>
              </div>


              
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
  // johnny's image rendering
  getClassOfStore (store) {
    // console.log('checking class:', store);
    // console.log('checking class:', store);
    // get's the current store object --> storage / item


    // NEED TO GET THE STORE.STORES NOT UNDEFINED

    // it's an item
    if(!store) {
      // console.log('!store - returned Store class');
      if (store.items) {
        // console.log('returned item');
        return 'item';
      } 
    }
    // it's a storage
    else {
      // console.log('item was rendered')
       if (!store.items) {
        // console.log('store defined - returned item');
        return 'item';
      } 
      // console.log('store - returned Store class');
      return 'store';
    }
  }
  ngOnInit() { 
    // console.log('stores in Diagram:',this.stores);
  }

}
