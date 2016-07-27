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

  // query brings a nice regular space object.
  query(): Promise<SpaceModel[]> {

    let prmSpace = this.http.get(this.baseUrl)
      .toPromise()
      .then((res : any) => {
        // console.log('res is :', res);
        
        const jsonSpace = res.json();
        const regularSpace = jsonSpace.map((jsonSpace : any) =>
          new SpaceModel(jsonSpace._id, jsonSpace.name, jsonSpace.stores));
          // console.log('regularSpace:', regularSpace);
        return regularSpace
      });

    prmSpace.catch(err => {
      console.log('SpaceService::query - Problem talking to server');
    });

    return prmSpace;
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
  save(storeData: any, id?: string) : Promise<SpaceModel>{
    console.log('spaceData', storeData);
    let response : any;
    let prmSpace : Promise<SpaceModel>;
    // push the new ROOM to the space object
    console.log('this.space', this.space);
    
    let house = this.space.stores.push(storeData);
    console.log('house with new room: ', house);
    console.log('house id:', id)

    const url = this.baseUrl + this.space._id;
    response = this.http.put(url, this.space)

    // if (id) {
    //   const url = this.baseUrl + id;
    //   response = this.http.put(url, house)
    // } else {
    //   // succefully saves NEW ROOM to database.
	  //   const url = this.baseUrl;
    //   response = this.http.post(url, house)
    //   // console.log('response from url:', response);
    // }

    prmSpace = response.toPromise()
      .then((res : any) => {
          const jsonSpace = res.json();
          // console.log('jsonSpace', jsonSpace);
          // update the client space array.
          // this.stores.push(jsonSpace);
          console.log('this.stores with new store in space:', this.space);
          
          return new SpaceModel(jsonSpace._id, jsonSpace.name, jsonSpace.stores);
      });

    prmSpace.catch(err => {
      console.log('SpaceService::save - Problem talking to server', err);
    });
    return prmSpace;
  }
}
