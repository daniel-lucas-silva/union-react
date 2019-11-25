import React, {useContext} from 'react';

import {AuthContext} from "../../App";
import {PageHeader} from "../../components/PageHeader";
import TopCards from "./TopCards";

export default function() {

  const {login} = useContext(AuthContext);

  return (
    <>
      <PageHeader title="Painel de Controle" />
      <TopCards/>
    </>
  );
}
