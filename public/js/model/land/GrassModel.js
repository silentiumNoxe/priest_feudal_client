import GameModel from '../GameModel';

export default class GrassLandModel extends GameModel {
  constructor({ type, id, width, height, img }) {
    const coordinates = { x: 0, y: 0 }; 
    super({ type, id, coordinates, imageUrl: img });
    this.width = width;
    this.height = height;
  }
}