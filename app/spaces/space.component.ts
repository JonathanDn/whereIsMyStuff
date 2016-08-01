import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SpaceService} from './space.service';
import {SpaceModel} from './space.model';

import {StoreListComponent} from './store-list.component';
import {StoreDiagramComponent} from './store-diagram.component';
import {ItemsListComponent} from './items-list.component';



@Component({
  moduleId: module.id,
  //styleUrls: [`scss/css/main.css`],
  selector: 'space-comp',
  directives: [StoreListComponent, StoreDiagramComponent,ItemsListComponent],
  template: `
    <section class="mainViewSection" *ngIf="space">
      <button (click)="setStore()">Go Home</button>
      <h2>Space {{space.name}}</h2>
      <div class="primarySpaceContainer">
        <div class="spacesSideBar">
            <h2>{{storeTypeToAdd}}s</h2>
            <div class="spaceCardContainer">
              <store-list *ngIf="!space.items" [stores]="space.stores" (selected)="setStore($event)"  >the list Should render here</store-list>
              <items-list *ngIf="!space.stores" [items]="space.items"></items-list>
              
            </div>

          <div *ngIf="!space.items" (click)="renderStoreType()" class="addSpaceBtn btn btn-primary">+ Add {{storeTypeToAdd}}</div>
          <div  *ngIf="!space.stores" (click)="addItem()" class="addSpaceBtn btn btn-primary">+ Add items</div>
          
        </div>

        <div class="storesPrimaryContainer">
          <!--<space-details>The Full Space Details</space-details>-->
          <store-diagram [stores]="space.stores" >The diagram should render here</store-diagram>
        </div>

      </div>
      <!--<pre>
          {{space | json}}
        </pre>-->

    </section>
  `
})
export class SpaceComponent implements OnInit {

// Input()
  private space : SpaceModel;
  private storeTypeToAdd;
  // private t;
  // private furnitures: any; 
  constructor(
                private route: ActivatedRoute, private router: Router,
                private spaceService : SpaceService
  ) { 



  }

  ngOnInit() {
  //  this.t = true;
  // let storeName = this.router.routerState.snapshot.queryParams["store"];
  // console.log('Store Name is ', storeName);
    this.storeTypeToAdd = this.spaceService.getStoreType();

    this.space = this.spaceService.getCurrStore();

     if (!this.space) {
          const id = '5797787f2ecc9326143177f0';
          const prmSpace = this.spaceService.get(id);
          prmSpace.then((space: SpaceModel) => {
            this.space = space;
        });

     }

     
  }
  setStore(store) {
    // console.log('setStoring!!!');
    
    // console.log('spaceComponent: store', store);
    
    // if this func is on, render the furnitures not rooms.
    this.space =  this.spaceService.setCurrStore(store)
    // change button name to add furnitures
      this.storeTypeToAdd = "Storage";
    // this.storeTypeToAdd = this.spaceService.getStoreType();
    this.spaceService.setStoreType();

  }
  renderStoreType() {
    console.log('Clicked');
    // this.storeTypeToAdd = "Room"
    console.log('renderStoreType: this.storeTypeToAdd', this.storeTypeToAdd);
    this.storeTypeToAdd = this.spaceService.setStoreType();
    console.log('renderStoreType: this.storeTypeToAdd', this.storeTypeToAdd);

    this.router.navigate(['/edit']);
    
    
  }

  addItem() {
    
    this.router.navigate(['/edit-item']);


  }
}
