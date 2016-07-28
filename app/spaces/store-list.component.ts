import { Component, OnInit, ViewChildren, Output, EventEmitter } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import {SpaceService} from './space.service';
import {SpaceModel} from './space.model';
// import {SpaceComponent} from './space.component';


@Component({
  moduleId: module.id,
  styleUrls: [`space.css`],
  pipes: [],
  inputs: ['stores'],
  outputs: ['selected'],
  directives: [],
  selector: 'store-list',
  template: `
    <section class="listContainer">
      <h2>{{listName}}</h2>
      <div *ngFor="let store of stores" (click)="storeSelected(store)" class="spaceCard btn btn-primary"  >
      <!--<div *ngFor="let store of stores"  class="spaceCard btn btn-primary"  >-->
        {{store.name}}
          <!--<a  [routerLink]="['/space', {store: store.name}]" >{{store.name}}</a>-->
          <!--<a  [routerLink]="['']"  [queryParams]="{store: store.name}">{{store.name}}</a>-->
          
      </div>

    </section>


  `
})
export class StoreListComponent implements OnInit {
  // TODO: let the pipe setup the initial filter
  // private filter = {byName: '', byPower: ''};
  // private space: any;
  private stores: any;
  // private selectedSpace : SpaceModel;
  public selected = new EventEmitter();
  private listName = 'Rooms';

  constructor(private toastr : ToastsManager) { }

  ngOnInit() {
  }

  storeSelected (store) {
    console.log('store', store);
    this.selected.emit(store); 

    this.listName = 'Storages';   
  }


  // removeSpace(spaceId : string) {
  //   this.spaceService.remove(spaceId)
  //     .then((space : SpaceModel)=>{
  //       this.space = space;
  //       this.toastr.success('You are awesome!', 'Success!');
  //     });
  // }

  // onSelect(space){
  //   // console.log('space here')
  //   this.selectedSpace = space;
  //   // console.log('this.selectedSpace.name', this.selectedSpace.name);
  // }
}
