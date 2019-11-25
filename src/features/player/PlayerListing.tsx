import React, {lazy, Suspense} from 'react';
import {RouteComponentProps, useHistory} from "react-router";

import Button from "antd/es/button";
import Tabs from "antd/es/tabs";
import Search from "antd/es/input/Search";

import {PageHeader} from "../../components/PageHeader";
import Loading from "../../components/Loading";
import {showDialog} from "../../components/Dialog";
import {PageTableProps} from "../../components/PageTable";
import {IUser} from "../../models/user";

const PageTable = lazy<(props: PageTableProps<IUser>) => Element|any>(() => import('../../components/PageTable'));
const BankForm = lazy(() => import('../forms/BankForm'));

const {TabPane} = Tabs;

interface BankListingProps { }
export default function (props: RouteComponentProps<BankListingProps>) {

  // @ts-ignore
  const {0: type}: { type: "users" | "agents" | "operators"; } = props.match.params;
  const history = useHistory();

  const newUser = () => showDialog({
    type: "modal",
    content: BankForm,
    width: 400,
    title: "Cadastro de Usuario"
  });

  function Table() {
    const tableProps: PageTableProps<IUser> = {
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          render: text => <a>{text}</a>,
          sorter: (a, b) => a.nick.length - b.nick.length,
          sortDirections: ['descend'],
        },
        {
          title: 'Nick',
          dataIndex: 'nick',
        },
      ],
      dataSource: [
        {
          id: 1,
          nick: 'Daniel Lucas',
          role: 'ADMIN',
          email: "dluc18@gmail.com"
        }
      ],
      onClick: (event, record, index) => {
        history.push(`/admin/player/${record.id}`);
      }
    };

    return (
      <PageTable
        {...tableProps}
      />
    )
  }

  return (
    <>
      <PageHeader
        title="Jogadores"
        canPop={false}
        buttons={[
          <Button
            key="reload"
            shape="circle"
            icon="reload"
          />,
          <Button
            key="new"
            type="primary"
            onClick={newUser}
          >
            Novo Jogador
          </Button>,
        ]}
        footer={
          <Tabs
            defaultActiveKey={history.location.pathname}
            onChange={history.push}
            tabBarExtraContent={
              <Search
                placeholder={"Digite sua busca"}
                onSearch={value => console.log(value)}
                style={{ width:  250 }}
              />
            }
          >
            <TabPane tab="Geral" key="/admin/players"/>
          </Tabs>
        }
      />
      <Suspense fallback={<Loading />}>
        <Table />
      </Suspense>
    </>
  );
}
