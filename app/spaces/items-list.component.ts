import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {SpaceService} from './space.service';
import {SpaceModel} from './space.model';

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

  constructor(SpaceService : SpaceService) { }


}
