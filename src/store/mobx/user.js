import { observable, action, computed } from 'mobx';

class UserStore {
  @observable user = null;

  @action.bound setUser(user) {
    this.user = user;
  }
}

const userStore = new UserStore();
export default userStore;
