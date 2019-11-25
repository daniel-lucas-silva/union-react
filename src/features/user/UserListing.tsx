import React, {lazy, Suspense, useEffect} from 'react';
import {Route, RouteComponentProps, Switch, useHistory} from "react-router";

import Button from "antd/es/button";
import Tabs from "antd/es/tabs";

import {PageHeader} from "../../components/PageHeader";
import Loading from "../../components/Loading";
import {showDialog} from "../../components/Dialog";
import {PageTableProps} from "../../components/PageTable";
import {IUser} from "../../models/user";
import Search from "antd/es/input/Search";
import http from "../../config/http";
import {Paginated} from "../../models/common";
import {observer} from "mobx-react";
import {useStores} from "../../store";

const PageTable = lazy<(props: PageTableProps<IUser>) => Element | any>(() => import('../../components/PageTable'));
const UsersStatistic = lazy(() => import('./UsersStatistic'));
const UserForm = lazy(() => import('../forms/UserForm'));

const {TabPane} = Tabs;

interface UserListingProps {
}

export default function (props: RouteComponentProps<UserListingProps>) {

  // @ts-ignore
  const {0: type}: { type: "users" | "agents" | "operators"; } = props.match.params;
  const history = useHistory();


  const Table = observer((props: RouteComponentProps) => {

    const { usersStore: { load, items, pagination, loading } } = useStores();

    useEffect(() => {
      load({ acceptCache: true });
    }, [type]);

    const tableProps: PageTableProps<IUser> = {
      pagination: {
        defaultPageSize: pagination.size,
        total: pagination.total,
        current: (pagination.offset / pagination.size) + 1
      },
      columns: [
        {
          title: 'Nick',
          dataIndex: 'nick',
          render: text => <a>{text}</a>,
          sorter: (a, b) => a.nick.length - b.nick.length,
          sortDirections: ['descend'],
        },
        {
          title: 'Role',
          dataIndex: 'role',
          filters: [
            {text: 'Admin', value: 'admin'},
            {text: 'Player', value: 'player'},
          ],
          onFilter: (value, record) => record.role.indexOf(value) === 0,
        },
        {
          title: 'Email',
          dataIndex: 'email',
        },
      ],
      dataSource: items,
      rowKey: (u) => u.id.toString(),
      onClick: (event, record, index) => {
        history.push(`/admin/user/${record.id}`);
      }
    };

    return (
      <PageTable
        {...tableProps}
      />
    )
  });

  const newUser = () => showDialog({
    type: "modal",
    content: UserForm,
    width: 400,
    title: "Cadastro de Usuario"
  });

  return (
    <>
      <PageHeader
        title="Usuarios"
        subtitle={type}
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
            Novo Usuário
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
                style={{width: 250}}
              />
            }
          >
            <TabPane tab="Geral" key={`/admin/${type}`}/>
            {type === "agents" && <TabPane tab="Estatística" key={`/admin/${type}/statistic`}/>}
          </Tabs>
        }
      />
      <Suspense fallback={<Loading/>}>
        <Switch>
          <Route path="/admin/(users|agents|operators)/" exact component={Table}/>
          <Route path="/admin/(agents|operators)/statistic" component={UsersStatistic}/>
        </Switch>
      </Suspense>
    </>
  );
}
