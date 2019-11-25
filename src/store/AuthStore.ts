import {action, observable, reaction} from "mobx";
import {IUser} from "../models/user";
import {IAuthLogin, IAuthLoginResponse} from "../config/interfaces";
import {Auth} from "../config/http";
import {Paginated} from "../models/common";

export class AuthStore {
  @observable token: string | any;
  @observable profile: IUser | any;

  constructor(public key: string) {
    const cacheResponse = this.cache;
    if (cacheResponse) {
      this.setUser(cacheResponse.data.user);
      this.setToken(cacheResponse.data.token);
    }
  }

  @action setToken(token: string) {
    console.log("Token Setted");
    this.token = token;
  }

  @action setUser(user: IUser) {
    this.profile = user;
  }

  logout() {

  }

  login = async (credential: IAuthLogin): Promise<void> => {
    try {
      const {data: response} = await Auth.login(credential);
      this.cache = response;
      this.setUser(response.data.user);
      this.setToken(response.data.token);
      return await Promise.resolve();
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  }

  get cache(): IAuthLoginResponse {
    const storage = localStorage.getItem(this.key);
    return storage ? JSON.parse(storage) : null;
  }

  set cache(data: IAuthLoginResponse) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
}
