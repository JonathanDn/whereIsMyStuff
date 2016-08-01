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

  delete(name: string) : Promise<SpaceModel> {
    //get the main obj find the name of storage you want to delete save it and sends it back, the whole tree!!
    //tree search in order???
    let que = this.query().then((res) => {
        let newStores = res.stores.filter((store) => {
          // console.log('store: ',store);
          return store.name !== name;
        });
        res.stores = [];
        res.stores = newStores;
    let response : any;
    let prmSpace : Promise<SpaceModel>;
    const url = this.baseUrl + this.space._id;
    // console.log('this.space',this.space);
    // console.log('this.space res',res);
    response = this.http.put(url, res)
    prmSpace = response.toPromise()
      .then((res : any) => {
          const jsonSpace = res.json();
          return new SpaceModel(jsonSpace._id, jsonSpace.name, jsonSpace.stores);
      });
    return prmSpace;
    });
    return que;
  }

  // query brings a nice regular space object.
  query(): Promise<SpaceModel> {
    const id = '5797787f2ecc9326143177f0';
    let prmSpace = this.http.get(this.baseUrl  + id)
      .toPromise()
      .then((res : any) => {
        // console.log('res is :', res);      
        const jsonSpace = res.json();
        // console.log('jsonSpace from server:', jsonSpace);       

        // const regularSpace = jsonSpace.map((jsonSpace : any) =>
        //   new SpaceModel(jsonSpace._id, jsonSpace.name, jsonSpace.stores));
          // console.log('regularSpace:', regularSpace);
        return jsonSpace
      });

    prmSpace.catch(err => {
      console.log('SpaceService::query - Problem talking to server');
    });

    return prmSpace;
  }

  

  // DELETE 
  remove(id: string) : Promise<SpaceModel> {
    console.log('query',this.query());
    
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
  save(storeData: any,addWhat? : string, id?: string) : Promise<SpaceModel>{
    if (addWhat === 'stores'){
 if ( !this.currStore.stores)   this.currStore.stores = [];
      this.currStore.stores.push(storeData);

    }else {
      //  delete this.currStore.stores;
      if ( !this.currStore.items)   this.currStore.items = [];
       this.currStore.items.push(storeData);
       
    }
    let response : any;
    let prmSpace : Promise<SpaceModel>;
    console.log('currStore',this.currStore);
    
    console.log('storeData',storeData);
    console.log('space',this.space);
    
      //  alert('storeData');
    const url = this.baseUrl + this.space._id;
    response = this.http.put(url, this.space)
    prmSpace = response.toPromise()
      .then((res : any) => {
          const jsonSpace = res.json();
          console.log('space',this.space);
          console.log('res',res);
          //////////////////////////////////////////////////////////////TODO: remove json.stores ?? when
          return new SpaceModel(jsonSpace._id, jsonSpace.name, jsonSpace.stores);
      });
    prmSpace.catch(err => {
      console.log('SpaceService::save - Problem talking to server', err);
    });
    return prmSpace;
  }
}
