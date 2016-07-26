import { Component, OnInit } from '@angular/core';
import {SpaceModel} from './space.model';
import {SpaceComponent} from './space.component'
import {SpaceService} from './space.service'

@Component({
  moduleId: module.id,
  selector: 'store-thumb',
  styleUrls: [`space.css`],
  inputs: ['space'],
  template: `
          <section>
            <p>{{space.name}}</p>
            <ul>
              <li *ngFor="let store of stores">bla{{store}}</li>
            </ul>
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
    this.space = this.spaceService.get('5797787f2ecc9326143177f0');
    this.stores = this.space.stores
  }

  ngOnInit() { }

}
