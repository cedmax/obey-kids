import { observable, action } from 'mobx'

class UserStore {
  @observable identity = null;

  @action.bound setUser (user) {
    this.identity = user
  }
}

const userStore = new UserStore()
export default userStore
