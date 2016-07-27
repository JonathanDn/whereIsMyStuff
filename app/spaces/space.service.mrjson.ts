import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {SpaceModel} from './space.model'; 

@Injectable()
export class SpaceService {

  private baseUrl = 'http://mrjson.com/data/57926f22fd12d79d3a39aad6/space/';
  constructor(private http: Http) {}

  // query (GETs a list)
  query(): Promise<SpaceModel[]> {

    let prmSpaces = this.http.get(this.baseUrl + 'list.json')
      .toPromise()
      .then(res => {
        const jsonSpaces = res.json();
        return jsonSpaces.map((jsonSpace : SpaceModel) =>
          new SpaceModel(jsonSpace.id, jsonSpace.name, jsonSpace.stores))
      });

    prmSpaces.catch(err => {
      console.log('SpaceService::query - Problem talking to server');
    });

    return prmSpaces;
  }

  // get (GETs a single)
  get(id: number) : Promise<SpaceModel> {
    let prmSpace = this.http.get(this.baseUrl + id + '.json')
      .toPromise()
      .then(res => {
        const jsonSpace = res.json();
        return new SpaceModel(jsonSpace.id, jsonSpace.name, jsonSpace.stores);
      });

    prmSpace.catch(err => {
      console.log('Problem talking to server');
    });
    return prmSpace;

  }

  // DELETE 
  remove(id: number) : Promise<SpaceModel[]> {
    let prmSpace = this.http.delete(this.baseUrl + id + '.json')
      .toPromise()
      .then(res => {
        return this.query();
      });

    prmSpace.catch(err => {
      console.log('Problem talking to server', err);
    });
    return prmSpace;
  }

  // save - Adds (POST) or update (PUT)  
  save(spaceData: any, id?: number) : Promise<SpaceModel>{

    let response : any;
    let prmSpace : Promise<SpaceModel>;

    if (id) {
      const url = this.baseUrl + id + '.json'
      response = this.http.put(url, spaceData)
    } else {
	    const url = this.baseUrl + 'item.json';
       response = this.http.post(url, spaceData)
    }

    prmSpace = response.toPromise()
      .then((res : any) => {
          const jsonSpace = res.json();
          return new SpaceModel(jsonSpace.id, jsonSpace.name, jsonSpace.stores);
      });

    prmSpace.catch(err => {
      console.log('Problem talking to server', err);
    });
    return prmSpace;
  }
}
