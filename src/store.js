import { observable } from 'mobx';

class Kid {
  @observable stars = 0;

  constructor(name, stars) {
    this.name = name;
    this.stars = stars;
    this.addStar = this.addStar.bind(this);
    this.removeStar = this.removeStar.bind(this);
  }

  addStar() {
    this.stars++;
  }

  removeStar() {
    this.stars--;
  }
}

class Store {
  constructor() {
    this.kids = [];
  }

  addKid(name, stars) {
    this.kids.push(new Kid(name, stars));
  }
}

const store = new Store();
export default store;
