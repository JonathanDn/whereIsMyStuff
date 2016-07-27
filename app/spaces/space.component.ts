import { Component, OnInit,Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SpaceService} from './space.service';
import {SpaceModel} from './space.model';
import {SpaceListComponent} from './space-list.component'
import {StoreThumbComponent} from './store-thumb.component'


@Component({
  moduleId: module.id,
  styleUrls: [`space.css`],
  selector: 'space-details',
  directives: [StoreThumbComponent],
  template: `
    <section *ngIf="space">
      <!--<h2>Space {{space.name}}</h2>-->
      <store-thumb [stores]="space.stores"></store-thumb>
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
