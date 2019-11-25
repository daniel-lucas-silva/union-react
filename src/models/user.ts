import {TableSource} from "./tableSource";
import {IResource} from "./common";

export type Role = 'ADMIN' | 'AGENT' | 'OPERATOR' | 'GUEST';

export interface IUser extends IResource<number> {
  nick: string;
  email: string;
  avatar?: string;
  role: Role;
}
