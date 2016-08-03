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
      <input #term type="text"  (keyup)="search(term.value)">
        <div style="display:flex;flex-direction: row">
          <a (click)="relocate('myHouse')" >My House / </a>
          <div *ngFor="let position of positions" >
            <a  (click)="relocate(position.name)">  {{position.name}}  /  </a>
        </div>
      </div>
      <div class="primarySpaceContainer">
        <div class="spacesSideBar">
            <h2>{{storeTypeToAdd}}s</h2>
            <div class="spaceCardContainer">
              <store-list *ngIf="!space.items" [stores]="space.stores" (selected)="setStore($event)" (deleteStore)="delete($event)" >the list Should render here</store-list>
              <store-list *ngIf="!space.stores" [stores]="space.items" (selected)="setStore($event)" (deleteStore)="delete($event)" >the list Should render here</store-list>
             
              
            </div>

          <div *ngIf="!space.items" (click)="renderStoreType();getStorageCard()" class="addSpaceBtn btn btn-primary">+ Add {{storeTypeToAdd}}</div>
          <div  *ngIf="!space.stores" (click)="addItem();getStorageCard()" class="addSpaceBtn btn btn-primary">+ Add items</div>
          
        </div>

        <div class="storesPrimaryContainer">
          <store-diagram [stores]="space.stores ? space.stores : space.items" >The diagram should render here</store-diagram>
        </div>

      </div>

    </section>
  `
})
export class SpaceComponent implements OnInit {

  private space : SpaceModel;
  private storeTypeToAdd;
  private positions = [];
  
  constructor(
                private route: ActivatedRoute, private router: Router,
                private spaceService : SpaceService
  ){} 

  ngOnInit() {
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
  getStorageCard() {
    // this.isImageStorage = true;

  }

  
  setStore(store) {
    if (!store){
      this.positions = [];

    } else {
      this.positions.push(store);
      console.log('ur location is :',this.positions);

    }
    this.space =  this.spaceService.setCurrStore(store);
    this.storeTypeToAdd = "Storage";
    this.spaceService.setStoreType();
  }

  renderStoreType() {
    this.storeTypeToAdd = this.spaceService.setStoreType();
    this.router.navigate(['/edit']);
  }
  
  addItem() {
    // this.storeTypeToAdd = 'Item';
    // this.storeTypeToAdd = this.spaceService.setStoreType();
    this.router.navigate(['/edit-item']);
  }

   delete(store) {
    // event.stopPropagation();
    // console.log('event is :', event);
    
    console.log('store for deletion: ',store);
    
    this.spaceService.delete(store.name)
      .then((res)=>{
          // console.log('my House after deletion: ',res);
          // console.log('query is: ',res);
          this.router.navigate(['']);
      });
  }

  search(value){
    console.log('search is :', value);
    let tree = this.spaceService.query().then((res)=> {
      console.log('tree is :', res);

    })
    
    
  }
  relocate(location){
    console.log('clicked', location);
    let reLocation = this.spaceService.query().then((space)=>{
      //only works for rooms
        let newStore = space.stores.filter((store)=>{
            console.log('store is', store);
            return store.name === location
        })
        console.log('newStore is :',newStore[0].stores);
        this.space.stores = newStore[0].stores;
        
    })
    
    
  }
}
