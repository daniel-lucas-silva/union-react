import React from 'react';
import {Layout, Menu} from 'antd';
import { useLocation } from 'react-router-dom';
import classes from '../styles/drawer.module.less';

const {Sider} = Layout;
const {SubMenu} = Menu;

export interface DrawerItem {
  key: string;
  icon?: React.ReactNode;
  title: string;
  onClick?: () => void;
  children?: DrawerItem[];
}

export interface DrawerProps {
  theme?: "dark" | "light";
  header: React.ReactNode;
  items?: DrawerItem[];
  footer?: React.ReactNode;
  className?: string;
}

export function Drawer(props: DrawerProps) {
  const { pathname } = useLocation();
  const {header, items, footer} = props;

  const selectedKeys = pathname.split('/').splice(2);

  const renderItem = (i: DrawerItem) => (
    <Menu.Item key={i.key} onClick={i.onClick}>
      {i.icon}
      <span className="nav-text">{i.title}</span>
    </Menu.Item>
  );

  return (
    <Sider
      width={250}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      className={props.className}
    >
      <div className={classes.root}>
        <div>{header}</div>
        {
          items && (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["dashboard"]} selectedKeys={selectedKeys}>
              {
                items.map((item) => {
                  if (item.children)
                    return (
                      <SubMenu
                        key={item.key}
                        title={
                          <span>
                          {item.icon}
                            <span>{item.title}</span>
                        </span>
                        }
                      >
                        <Menu.Item>{item.children.map(renderItem)}</Menu.Item>
                      </SubMenu>
                    );
                  return renderItem(item);
                })
              }
            </Menu>
          )
        }
        <div>{footer}</div>
      </div>
    </Sider>
  );
}
