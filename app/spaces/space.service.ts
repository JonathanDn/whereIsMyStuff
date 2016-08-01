import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ActivatedRoute, Router } from '@angular/router';


import {SpaceModel} from './space.model'; 

@Injectable()
export class SpaceService {

  private baseUrl = 'http://localhost:3003/data/space/';
  private space: any;
  private currStore: any;

  private storeTypeToAdd = "Room";
  constructor(private http: Http,  private router: Router) {   }

getStoreType() {
  return this.storeTypeToAdd;
}

setStoreType() {
  this.storeTypeToAdd = "Storage";
  return this.storeTypeToAdd;
}

getCurrStore() {
  return this.currStore;
}
setCurrStore(store) {
  if (store) this.currStore = store;
  else this.currStore = this.space;
  return this.currStore;
}
  
  // get (GETs a single)
  get(id: string) : Promise<SpaceModel> {
    let prmSpace = this.http.get(this.baseUrl + id)
      .toPromise()
      .then(res => {
        const jsonSpace = res.json();
        this.space = new SpaceModel(jsonSpace._id, jsonSpace.name, jsonSpace.stores);
        this.currStore = this.space;
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

  delete(name: string): Promise<SpaceModel> {
    // console.log('this.currentStore',this.currStore);
    // console.log('name is: ',name);
    
    if (this.currStore.stores) {
      this.currStore.stores = this.currStore.stores.filter((store) => {
        return store.name !== name
      })
       if ( this.currStore.stores.length === 0){
        delete this.currStore.stores
      }
    } else if (this.currStore.items) {
        this.currStore.items = this.currStore.items.filter((item) => {
        return item.name !== name
    })
      if ( this.currStore.items.length === 0){
        delete this.currStore.items
      }
    }
    // console.log('this.currentStore after',this.currStore);
    let response : any;
    let prmSpace : Promise<SpaceModel>;
    const url = this.baseUrl + this.space._id;
    response = this.http.put(url, this.space)
    prmSpace = response.toPromise()
      .then((res: any) => {
        const jsonSpace = res.json();
        return new SpaceModel(jsonSpace._id, jsonSpace.name, jsonSpace.stores);
      });
    prmSpace.catch(err => {
      console.log('SpaceService::save - Problem talking to server', err);
    });
    return prmSpace;
  }

  query(): Promise<SpaceModel> {
    const id = '5797787f2ecc9326143177f0';
    let prmSpace = this.http.get(this.baseUrl + id)
      .toPromise()
      .then((res: any) => {
        const jsonSpace = res.json();
        return jsonSpace
      });

    prmSpace.catch(err => {
      console.log('SpaceService::query - Problem talking to server');
    });

    return prmSpace;
  }

  

  // DELETE 
  remove(id: string) : Promise<SpaceModel> {
    
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


  // Daniel what did you do here?

  // save - Adds (POST) or update (PUT)  
  save(storeData: any,addWhat? : string, id?: string) : Promise<SpaceModel>{
    if (addWhat === 'stores'){
    if ( !this.currStore.stores)    this.currStore.stores = [];
      this.currStore.stores.push(storeData);

    } else {
      if ( !this.currStore.items)   this.currStore.items = [];
       this.currStore.items.push(storeData);

    }

    let response : any;
    let prmSpace : Promise<SpaceModel>;
    // console.log('currStore',this.currStore);
    
    // console.log('storeData',storeData);
    // console.log('space',this.space);
    
    const url = this.baseUrl + this.space._id;
    response = this.http.put(url, this.space)
    prmSpace = response.toPromise()
      .then((res : any) => {
          const jsonSpace = res.json();
          // console.log('space',this.space);
          // console.log('res',res);
          //////////////////////////////////////////////////////////////TODO: remove json.stores ?? when
          return new SpaceModel(jsonSpace._id, jsonSpace.name, jsonSpace.stores);
      });
    prmSpace.catch(err => {
      console.log('SpaceService::save - Problem talking to server', err);
    });
    return prmSpace;
  }
}
