import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import {SpaceService} from './space.service';
import {SpaceModel} from './space.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';




@Component({
  moduleId: module.id,
  selector: 'items-list',
  inputs: ['items'],
  outputs: ['deleteStore'],
  template: `
                  <section class="listContainer">
                    <div *ngFor="let item of items"  class="spaceCard btn btn-primary"  >
                       {{item.name}}
          
                        <button (click)="delete(item)" class="btn btn-primary">  <span class="glyphicon glyphicon-trash"></span></button>
                        <button (click)="update(item)" class="btn btn-primary">  <span class="glyphicon glyphicon-edit"></span></button>
                        
                    </div>

                  </section>

  
  
  `,
})
export class ItemsListComponent  {

    private items : any ; 
    private deleteStore: any = new EventEmitter();
  constructor (private toastr : ToastsManager,  private spaceService: SpaceService, private router: Router) { }

   delete(store){
    event.stopPropagation();
    // console.log('event is :', event);
    this.deleteStore.emit(store);
  }

  update(item){
      console.log('update');
      
  }
}
