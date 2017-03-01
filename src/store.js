import { observable, action } from 'mobx';

class Kid {
  constructor(name, stars) {
    this.name = name;
    this.stars = stars;
  }
  
  @observable stars = 0;

  @action.bound addStar() {
    this.stars++;
  }

  @action.bound removeStar() {
    this.stars--;
  }
}

class Store {
  @observable user = null;
  @observable kids = [];

  @action.bound onLogin(user) {
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
