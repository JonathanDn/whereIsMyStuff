export class SpaceModel {

  constructor(private _id: string, public name: string, public stores: any[]) {}

  get id() {
    return this._id;
  }
  getImgUrl() {
    return `public/img/space/${this.name}.png`;
  }
}
