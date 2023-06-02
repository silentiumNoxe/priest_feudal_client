export default class GameModel {
    constructor({ type, id, coordinates, imageUrl }) {
      this.type = type;
      this.id = id;
      this.coordinates = coordinates;
      this.imageUrl = imageUrl;
    }
  }