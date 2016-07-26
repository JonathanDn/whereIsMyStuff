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
              <div class="spaceCard btn btn-primary" *ngFor="let space of spaces" (click)="onSelect(space)" >
                  <div> {{space.name}}</div>
              </div>
            </div>

          <a routerLink="/space/edit" class="addSpaceBtn btn btn-primary">+ Add Space</a>
        </div>

        <div>
          <space-details>The Full Space Details</space-details>
        </div>
        

      </div>

    </section>


  `
})
export class SpaceListComponent implements OnInit {
  // TODO: let the pipe setup the initial filter
  private filter = {byName: '', byPower: ''};
  private spaces: any;
  private selectedSpace : SpaceModel;

  constructor(private toastr : ToastsManager, private spaceService : SpaceService) { }

  ngOnInit() {
    const prmSpaces = this.spaceService.query();
    console.log('prmSpaces', prmSpaces);
    console.log('this.spaces', this.spaces);
    
    // this.spaces = this.spaceService.query();
    prmSpaces.then((spaces : SpaceModel[]) => {
      console.log('spaces promise resolved:', spaces);
      this.spaces = spaces;
      // console.log('spaces', spaces[0]);
      // this.spaces = this.spaceService.spaces;
    });

    prmSpaces.catch(err => {
      alert('Sorry,cannot load the spaces, try again later');
      console.log('Cought an error in SpaceList', err);
    });

    
  }
  removeSpace(spaceId : string) {
    this.spaceService.remove(spaceId)
      .then((spaces : SpaceModel[])=>{
        this.spaces = spaces;
        this.toastr.success('You are awesome!', 'Success!');
      });
  }

  onSelect(space){
    console.log('space here')
    this.selectedSpace = space;
    // console.log('this.selectedSpace.name', this.selectedSpace.name);

    
  }
}
