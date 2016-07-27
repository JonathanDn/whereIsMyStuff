import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {SpaceModel} from './space.model'; 

@Injectable()
export class SpaceService {

  private baseUrl = 'http://localhost:3003/data/space/';
  private space: any;
  constructor(private http: Http) {   }

  
  // get (GETs a single)
  get(id: string) : Promise<SpaceModel> {
    let prmSpace = this.http.get(this.baseUrl + id)
      .toPromise()
      .then(res => {
        const jsonSpace = res.json();
        this.space = new SpaceModel(jsonSpace._id, jsonSpace.name, jsonSpace.stores);
        return this.space;
      });

    prmSpace.catch(err => {
      console.log('SpaceService::get - Problem talking to server');
    });
    return prmSpace;
  }

  getSpace() {
    return this.space;
  }

  // query brings a nice regular spaces array.
  query(): Promise<SpaceModel[]> {

    let prmSpaces = this.http.get(this.baseUrl)
      .toPromise()
      .then((res : any) => {
        // console.log('res is :', res);
        
        const jsonSpace = res.json();
        const regularSpaces = jsonSpace.map((jsonSpace : any) =>
          new SpaceModel(jsonSpace._id, jsonSpace.name, jsonSpace.spaces));
          // console.log('regularSpaces:', regularSpaces);
        return regularSpaces
      });

    prmSpaces.catch(err => {
      console.log('SpaceService::query - Problem talking to server');
    });

    return prmSpaces;
  }

  

  // DELETE 
  remove(id: string) : Promise<SpaceModel[]> {
    let prmSpace = this.http.delete(this.baseUrl + id)
      .toPromise()
      .then(res => {
        return this.query();
      });

    prmSpace.catch(err => {
      console.log('SpaceService::remove - Problem talking to server', err);
    });
    return prmSpace;
  }

  // save - Adds (POST) or update (PUT)  
  save(spaceData: any, id?: string) : Promise<SpaceModel>{
    // console.log('spaceData', spaceData);
        this.space =  this.query();
    console.log('spaces from DB', this.space);
    let response : any;
    let prmSpace : Promise<SpaceModel>;
    // push the new ROOM to the spaces array within the HOUSE object.
    let house = this.space.spaces.push(spaceData);
    console.log('house with new room: ', house);
    
    if (id) {
      const url = this.baseUrl + id;
      response = this.http.put(url, house)
    } else {
      // succefully saves NEW ROOM to database.
	    const url = this.baseUrl;
      response = this.http.post(url, house)
      // console.log('response from url:', response);
    }

    prmSpace = response.toPromise()
      .then((res : any) => {
          const jsonSpace = res.json();
          // console.log('jsonSpace', jsonSpace);
          // update the client space array.
          // this.spaces.push(jsonSpace);
          console.log('this.spaces with new space object:', this.space);
          
          return new SpaceModel(jsonSpace._id, jsonSpace.name, jsonSpace.spaces);
      });

    prmSpace.catch(err => {
      console.log('SpaceService::save - Problem talking to server', err);
    });
    return prmSpace;
  }
}
