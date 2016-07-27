import { Component, OnInit } from '@angular/core';
import {SpaceModel} from './space.model';
import {SpaceComponent} from './space.component'
import {SpaceService} from './space.service'

@Component({
  moduleId: module.id,
  selector: 'store-thumb',
  styleUrls: [`space.css`],
  template: `
          <section>
            <!--<p>{{space.name}}</p>-->
            <div class="storeContainer">
              <div class="store" *ngFor="let store of stores ">{{store.name}}</div>
            </div>
            <!--<a routerLink="/space/{{space.id}}/{{space.name}}">-->
              <!--<img class="imgSpace" [src]="space.getImgUrl()" />-->
            <!--</a>-->

          </section>
          `

})
export class StoreThumbComponent implements OnInit {

  private stores : SpaceModel;
  private space: any;
  constructor( private spaceService: SpaceService) { 
    this.space = this.spaceService.getSpace();
    // console.log('this.space in store:', this.space);
    
    this.stores = this.space.stores
    // console.log('this.stores ', this.stores );
    
  }

  ngOnInit() { }

}
