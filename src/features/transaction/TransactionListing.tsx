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
const TransactionStatistics = lazy(() => import('./TransactionStatistics'));

const {TabPane} = Tabs;

interface TransactionListingProps { }
export default function (props: RouteComponentProps<TransactionListingProps>) {

  const history = useHistory();

  const newUser = () => showDialog({
    type: "modal",
    content: BankForm,
    width: 400,
    title: "Nova Transaçao"
  });

  function renderTable() {
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
      ],
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
        title="Transações"
        subtitle="Financeiro"
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
            Nova Transação
          </Button>,
        ]}
        footer={
          <Tabs
            defaultActiveKey={history.location.pathname}
            activeKey={history.location.pathname}
            onChange={history.push}
            tabBarExtraContent={
              <Search
                placeholder={"Digite sua busca"}
                onSearch={value => console.log(value)}
                style={{ width:  250 }}
              />
            }
          >
            <TabPane tab="Geral" key="/admin/transactions"/>
            <TabPane tab="Estatisticas" key="/admin/transactions/statistic"/>
          </Tabs>
        }
      />
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/admin/transactions/" exact render={renderTable}/>
          <Route path="/admin/transactions/statistic" component={TransactionStatistics} />
        </Switch>
      </Suspense>
    </>
  );
}
