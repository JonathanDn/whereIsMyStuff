import { Component, OnInit, ViewChildren, Output, EventEmitter } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ActivatedRoute, Router } from '@angular/router';


import {SpaceService} from './space.service';
import {SpaceModel} from './space.model';


@Component({
  moduleId: module.id,
  //styleUrls: [`scss/css/main.css`],
  pipes: [],
  inputs: ['stores'],
  outputs: ['selected','deleteStore'],
  directives: [],
  selector: 'store-list',
  template: `
    <section class="listContainer">
      <div *ngFor="let store of stores" (click)="storeSelected(store)" class="spaceCard btn btn-primary"  >
        {{store.name}}
        <button (click)="delete(store)" class="btn btn-primary">  <span class="glyphicon glyphicon-trash"></span></button>
        <button (click)="update(store)" class="btn btn-primary">  <span class="glyphicon glyphicon-edit"></span></button>

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
  public deleteStore = new EventEmitter();
  

  constructor(private toastr : ToastsManager,  private spaceService: SpaceService, private router: Router) {}

  ngOnInit() {
  }

  storeSelected (store) {
    console.log('here is :');
    this.selected.emit(store); 
  }

  //needs to be done in service
  // delete(store){
  //   event.stopImmediatePropagation();
  //   console.log('store for deletion: ',store);
    
  //   this.spaceService.delete(store.name)
  //     .then((res)=>{
  //         // console.log('my House after deletion: ',res);
  //         // console.log('query is: ',res);
  //         this.router.navigate(['']);
  //     });
  // }

  delete(store){
    event.stopPropagation();
    // console.log('event is :', event);
    this.deleteStore.emit(store);
  }

   update(store){
      console.log('update');
      
  }
}
