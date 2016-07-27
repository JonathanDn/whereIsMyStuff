import { Component, OnInit,Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SpaceService} from './space.service';
import {SpaceModel} from './space.model';

import {StoreListComponent} from './store-list.component'
import {StoreDiagramComponent} from './store-diagram.component'


@Component({
  moduleId: module.id,
  styleUrls: [`space.css`],
  selector: 'space-comp',
  directives: [StoreListComponent, StoreDiagramComponent],
  template: `
    <section class="mainViewSection" *ngIf="space">
      <!--<h2>Space {{space.name}}</h2>-->
      <div class="primarySpaceContainer">
        <div class="spacesSideBar">
            
            <div class="spaceCardContainer">
              <store-list>the list Should render here</store-list>
            </div>

          <a routerLink="/edit" class="addSpaceBtn btn btn-primary">+ Add Store</a>
        </div>

        <div class="storesPrimaryContainer">
          <!--<space-details>The Full Space Details</space-details>-->
          <store-diagram [stores]="space.stores">The diagram should render here</store-diagram>
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

  constructor(
                private route: ActivatedRoute,
                private spaceService : SpaceService
  ) { }

  ngOnInit() {
   this.route.params.subscribe(params => {
    //  console.log('Params are: ', params);
    //  const id = params['id'];
     const id = '5797787f2ecc9326143177f0';
     const prmSpace = this.spaceService.get(id);
     prmSpace.then((space: SpaceModel) => {
       this.space = space;
     });
   });
  }



}
