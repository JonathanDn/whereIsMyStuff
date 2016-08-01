import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {SpaceService} from './space.service';
import {SpaceModel} from './space.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';




@Component({
  moduleId: module.id,
  selector: 'items-list',
  inputs: ['items'],

  template: `
                  <section class="listContainer">
                    <div *ngFor="let item of items" (click)="storeSelected(item)" class="spaceCard btn btn-primary"  >
                       {{item.name}}
          
                        <button (click)="delete(item)" class="btn btn-primary">  <span class="glyphicon glyphicon-trash"></span></button>
                    </div>

                  </section>

  
  
  `,
})
export class ItemsListComponent  {

    private items : any ; 

  constructor (private toastr : ToastsManager,  private spaceService: SpaceService, private router: Router) { }

  delete(item){
    event.stopImmediatePropagation();
    // console.log('store for deletion: ',store);
    
    this.spaceService.delete(item.name)
      .then((res)=>{
          // console.log('my House after deletion: ',res);
          // console.log('query is: ',res);
          this.router.navigate(['']);
      });
  }
}
