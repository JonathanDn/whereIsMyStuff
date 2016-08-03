export class SpaceModel {

  constructor(private _id: string = undefined, public name: string = '', public stores: any[] = [], private path: string[] = []) {}

  get id() {
    return this._id;
  }
  getImgUrl() {
    return `public/img/space/${this.name}.png`;
  }
}
