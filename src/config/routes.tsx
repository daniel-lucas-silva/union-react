import {lazy, default as React} from "react";
import {RouteComponentProps} from "react-router";
import AuthContainer from "../containers/AuthContainer";


export interface IRoute {
  exact?: boolean;
  path: string;
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  before?: (to: IRoute, from: IRoute, next: Function) => void;
}

const routes: IRoute[] = [
  {
    path: 'admin',
    component: lazy(() => import('../containers/AdminContainer')),
  },
  {
    path: 'auth',
    component: AuthContainer,
  }
];

export default routes;
