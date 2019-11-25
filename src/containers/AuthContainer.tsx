import React from 'react';
import {Route, RouteComponentProps, Switch} from "react-router";

import Login from "../features/auth/Login";

export default function(props: RouteComponentProps) {
  return (
    <Switch>
      <Route path="/auth" exact component={Login} />
    </Switch>
  );
}
