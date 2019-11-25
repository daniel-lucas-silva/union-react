import React, {lazy, Suspense} from 'react';
import {Route, RouteComponentProps, Switch, useHistory} from "react-router";

import Button from "antd/es/button";
import Tabs from "antd/es/tabs";

import {PageHeader} from "../../components/PageHeader";
import Loading from "../../components/Loading";
import {showDialog} from "../../components/Dialog";
import {PageTableProps} from "../../components/PageTable";
import {IBank} from "../../models/bank";
import Search from "antd/es/input/Search";

const PageTable = lazy<(props: PageTableProps<IBank>) => Element|any>(() => import('../../components/PageTable'));
const BankForm = lazy(() => import('../forms/BankForm'));

const {TabPane} = Tabs;

interface UserListingProps { }
export default function (props: RouteComponentProps<UserListingProps>) {

  const history = useHistory();

  const newUser = () => showDialog({
    type: "modal",
    content: BankForm,
    width: 400,
    title: "Cadastro de Banco"
  });

  function Table() {
    const tableProps: PageTableProps<IBank> = {
      columns: [
        {
          title: 'Nome',
          dataIndex: 'name',
          render: text => <a>{text}</a>,
          sorter: (a, b) => a.name.length - b.name.length,
          sortDirections: ['descend'],
        },
        {
          title: 'Agencia',
          dataIndex: 'ag',
          // filters: [
          //   { text: 'Admin', value: 'admin' },
          //   { text: 'Player', value: 'player' },
          // ],
          // onFilter: (value, record) => record.role.indexOf(value) === 0,
        },
        {
          title: 'Conta',
          dataIndex: 'cc',
        },
        {
          title: 'Balanço',
          dataIndex: 'balance',
        },
        {
          title: 'Gerente',
          dataIndex: 'managerName',
        },
      ],
      dataSource: [
        {
          key: '1',
          id: 1,
          name: 'Bradesco',
          ag: '12331',
          cc: '1231',
          balance: 200,
          type: 'CONTA-CORRENTE',
          managerEmail: 'jao@jmail.com',
          managerName: 'jao',
          managerPhone: '123123123',
          createdAt: Date.now()
        }
      ]
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
        title="Bancos"
        subtitle="Contas bancarias"
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
            Novo Banco
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
            <TabPane tab="Geral" key="/admin/banks"/>
          </Tabs>
        }
      />
      <Suspense fallback={<Loading />}>
        <Table />
      </Suspense>
    </>
  );
}
