import {IUser} from "./user";

export interface ILoginResponse {
  data: {
    token: string;
    user: IUser;
  }
}

export interface ILogin {
  identity: string;
  password: string;
}
