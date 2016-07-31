import { Component, OnInit, ViewChildren, Output, EventEmitter } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ActivatedRoute, Router } from '@angular/router';


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
      <div *ngFor="let store of stores" (click)="storeSelected(store)" class="spaceCard btn btn-primary"  >
        {{store.name}}
          
    <button (click)="delete(store)" class="btn btn-primary">  <span class="glyphicon glyphicon-trash"></span></button>
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

  constructor(private toastr : ToastsManager,  private spaceService: SpaceService, private router: Router) {}

  ngOnInit() {
    console.log('stores in list:',this.stores);
    
  }

  storeSelected (store) {
    console.log('store', store);
    this.selected.emit(store); 
    
    // this.spaceService.setStoreType();
  }

  //needs to be done in service
  delete(store){
    event.stopImmediatePropagation();
    this.spaceService.delete(store.name)
      .then((res)=>{
          console.log('my House after deletion: ',res);
          this.router.navigate(['']);
      });


    // this.spaceService.delete(store.name);
    // console.log('deleted',store);s
    
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
