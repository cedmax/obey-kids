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
  @observable user = null;
  @observable kids = [];
  
  constructor() {
    this.onLogin = this.onLogin.bind(this);
    this.addKid = this.addKid.bind(this);
  }

  onLogin(user) {
    this.user = user;
  }

  addKid(name, stars) {
    this.kids.push(new Kid(name, stars));
  }
}

const store = new Store();
export default store;
