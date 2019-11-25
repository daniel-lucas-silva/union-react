import React, {Suspense, lazy, useState} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Loading from "../components/Loading";
import {Button, Result} from "antd";
import {useStores} from "../store";
import {observer} from "mobx-react";


function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Página não encontrada."
      extra={<Button type="primary">Voltar</Button>}
    />
  );
}

const AdminContainer = lazy(() => import('./AdminContainer'));
const AuthContainer = lazy(() => import('./AuthContainer'));

export default observer(() => {

  const { authStore: { token } } = useStores();
  console.log("AppContainer rendered");

  return (
    <Router>
      <Suspense fallback={<Loading/>}>
        <Switch>
          <Route path="/admin" render={props => !!token ? <AdminContainer {...props}/> : <Redirect to='/auth'/>}/>
          <Route path="/auth" render={props => !token ? <AuthContainer {...props}/> : <Redirect to='/admin'/>}/>
          <Route component={NotFound}/>
        </Switch>
      </Suspense>
    </Router>
  );
});
