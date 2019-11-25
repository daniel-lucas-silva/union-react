import React from 'react';
// import Button from "antd/es/button";
import Tabs from "antd/es/tabs";
import {PageHeader} from "../../components/PageHeader";
import {Switch, useHistory} from "react-router";
import Button from "antd/es/button";
import {Avatar} from "antd";

export default function() {
  const history = useHistory();

  return (
    <>
      <PageHeader
        avatar={{
          icon: 'user'
        }}
        title="Nome do Jogador"
        canPop
        buttons={[
          <Button key="1">Transferencia</Button>,
          <Button key="2" type="primary">Novo Lancamento</Button>
        ]}
        footer={
          <Tabs
            defaultActiveKey={history.location.pathname}
            onChange={history.push}
            activeKey={history.location.pathname}
          >
            <Tabs.TabPane tab="Movimentaçoes" key="/admin/player/1"/>
            <Tabs.TabPane tab="Cadastro" key="/admin/player/1/register"/>
          </Tabs>
        }
      />
    </>
  );
}
