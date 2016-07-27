import { Component, OnInit, ViewChildren } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import {SpaceService} from './space.service';
import {SpaceModel} from './space.model';
import {SpaceComponent} from './space.component';


@Component({
  moduleId: module.id,
  styleUrls: [`space.css`],
  pipes: [],
  directives: [SpaceComponent],
  // selector: 'space-list',
  template: `
    <section>
      <h2>Spaces</h2>

      <div class="primarySpaceContainer">

        <div class="spacesSideBar">
            
            <div class="spaceCardContainer">
              <div class="spaceCard btn btn-primary" *ngFor="let store of stores" (click)="onSelect(space)" >
                  <div> {{space.name}}</div>
              </div>
            </div>

          <a routerLink="/space/edit" class="addSpaceBtn btn btn-primary">+ Add Store</a>
        </div>
        <!--space component renders here:-->
        <div class="storesPrimaryContainer">
          <space-details>The Full Space Details</space-details>
        </div>
        

      </div>

    </section>


  `
})
export class SpaceListComponent implements OnInit {
  // TODO: let the pipe setup the initial filter
  private filter = {byName: '', byPower: ''};
  private space: any;
  private stores: any;
  private selectedSpace : SpaceModel;

  constructor(private toastr : ToastsManager, private spaceService : SpaceService) { }

  ngOnInit() {
    const prmSpace = this.spaceService.query();
    // let a = prmSpace[0];
    console.log('prmSpace', prmSpace);
    // console.log('this.space', this.spaces);
    
    // this.space = this.spaceService.query();
    prmSpace.then((space : SpaceModel) => {
      // console.log('spaces promise resolved:', spaces);
      // this.space = space.stores;
      console.log('space', space);
      
      
      // console.log('space', space[0]);
      this.stores = space.stores;
    });

    prmSpace.catch(err => {
      alert('Sorry,cannot load the spaces, try again later');
      console.log('Cought an error in SpaceList', err);
    });

    
  }
  removeSpace(spaceId : string) {
    this.spaceService.remove(spaceId)
      .then((space : SpaceModel[])=>{
        this.space = space;
        this.toastr.success('You are awesome!', 'Success!');
      });
  }

  onSelect(space){
    // console.log('space here')
    this.selectedSpace = space;
    // console.log('this.selectedSpace.name', this.selectedSpace.name);

    
  }
}
