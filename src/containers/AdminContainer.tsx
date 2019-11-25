import React from 'react';
import {Button, Dropdown, Icon, Layout, Menu} from 'antd';
import {Redirect, Route, RouteComponentProps, Switch, useHistory} from "react-router";
import {createUseStyles} from 'react-jss';

import {Drawer, DrawerItem} from '../components/Drawer';
import Dashboard from "../features/dashboard/Dashboard";
import Logo from "../components/Logo";
import {UserTile} from "../components/UserTile";
import UserDetail from "../features/user/UserDetail";
import UserListing from "../features/user/UserListing";
import PlayerDetail from "../features/player/PlayerDetail";
import PlayerListing from "../features/player/PlayerListing";
import BankListing from "../features/bank/BankListing";
import TransactionListing from "../features/transaction/TransactionListing";
import {useStores} from "../store";


const useStyles = createUseStyles({
  root: {
    height: '100vh',
  },
  content: {
    height: '100%',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
  },
});

const {Content} = Layout;

export default function (props: RouteComponentProps) {
  const history = useHistory();
  const styles = useStyles();

  // const {user} = useContext(AuthContext);

  const menu: DrawerItem[] = [
    {
      key: "dashboard",
      icon: <Icon type="dashboard"/>,
      title: "Painel de Controle",
      onClick: () => history.push("/admin/dashboard")
    },
    {
      key: "transactions",
      icon: <Icon type="sliders"/>,
      title: "Transações",
      onClick: () => history.push("/admin/transactions")
    },
    {
      key: "bank",
      icon: <Icon type="bank"/>,
      title: "Bancos",
      onClick: () => history.push("/admin/banks")
    },
    {
      key: "players",
      icon: <Icon type="team"/>,
      title: "Jogadores",
      onClick: () => history.push("/admin/players")
    },
    {
      key: "agents",
      icon: <Icon type="robot"/>,
      title: "Agentes",
      onClick: () => history.push("/admin/agents")
    },
    {
      key: "users",
      icon: <Icon type="safety"/>,
      title: "Usuários",
      onClick: () => history.push("/admin/users")
    }
  ];

  const DrawerFooter = () => {
    const { authStore: { logout, profile } } = useStores();

    const menu = (
      <Menu>
        <Menu.Item>
          Configurações
        </Menu.Item>
        <Menu.Item onClick={async () => {
          logout();
          history.push('/auth');
        }}>
          Sair
        </Menu.Item>
      </Menu>
    );

    return (
      <UserTile
        title={profile.nick}
        subtitle={profile.email}
        trailing={
          <Dropdown overlay={menu} placement="topRight" trigger={['click']}>
            <Button type="primary" shape="circle" icon="more"/>
          </Dropdown>}
      />
    )
  };


  return (
    <Layout>
      <Drawer
        header={<Logo theme="dark"/>}
        footer={<DrawerFooter/>}
        items={menu}
      />
      <Layout className={styles.root}>
        <Content className={styles.content}>
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard}/>
            <Route path="/admin/user/:id" component={UserDetail}/>
            <Route path="/admin/(users|agents|operators)/" component={UserListing}/>
            <Route path="/admin/player/:id" component={PlayerDetail}/>
            <Route path="/admin/players" component={PlayerListing}/>
            <Route path="/admin/transactions" component={TransactionListing}/>
            <Route path="/admin/banks" component={BankListing}/>
            <Redirect to="/admin/dashboard"/>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}
