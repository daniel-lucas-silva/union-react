import {IUser} from "../models/user";

export interface IAuthLogin {
  identity: string;
  password: string;
}

export interface IAuthLoginResponse {
  data: {
    token: string;
    user: IUser;
  }
}
