import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import {SpaceComponent} from './space.component'
// import {SpaceModel} from './space.model';
import {SpaceService} from './space.service';

@Component({
  moduleId: module.id,
  selector: 'user-search',
  directives: [],
  outputs:['search'],
  template: `
          <section>
            Search Item: <input #i (keyup)="searchBegin(i.value);checkEvent($event)" type="text">
            user searched:{{i.value}}
          </section>
          `

})
export class SearchComponent implements OnInit {
    private search = new EventEmitter();
    constructor( private spaceService: SpaceService) { }
  
 
  ngOnInit() { 
  }

  // for debugging
  checkEvent(ev) {
    // console.log('ev:', ev);
  }

  searchBegin(iValue) {
    console.log('i.value in search comp:', iValue);

    // treat the issue of when there is nothing written but change occured:
    if (iValue === '') return;
    // OUTPUTS the searched string
      this.search.emit(iValue);
  }
}
