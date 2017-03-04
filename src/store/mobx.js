import { observable, action } from 'mobx';

class Kid {
  @observable stars = 0;
  
  constructor(name, stars) {
    this.name = name;
    this.stars = stars;
  }

  @action.bound setStar(stars) {
    this.stars = stars;
  }
}

class Store {
  @observable user = null;
  @observable kids = [];

  @action.bound setUser(user) {
    this.user = user;
  }

  @action.bound addKid(name, stars) {
    if (name) {
      this.kids.push(new Kid(name, stars));
    }
  }
}

const store = new Store();
export default store;
