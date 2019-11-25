import React, {createElement} from 'react';
import {createUseStyles} from 'react-jss';
import {AvatarProps} from "antd/es/avatar";
import Tag from "antd/es/tag";
import Tabs from "antd/es/tabs";
import Header from "antd/es/page-header";

import {SearchBar, SearchProps} from "./SearchBar";

const useStyles = createUseStyles({
  root: {
    borderBottom: '1px solid rgb(235, 237, 240)'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  search: {
    position: 'relative',
    top: -7,
  },
});

interface Props {
  title: string;
  subtitle?: string;
  canPop?: boolean;
  buttons?: React.ReactNodeArray;
  children?: React.ReactNode;
  avatar?: AvatarProps;
  tag?: React.ReactElement<Tag>;
  footer?: React.ReactElement;
  onSearch?: (term: string) => void;
  searchProps?: SearchProps;
}
export function PageHeader(props: Props) {
  const classes = useStyles();

  return (
    <Header
      ghost={false}
      className={classes.root}
      onBack={props.canPop ? () => window.history.back() : undefined}
      title={props.title}
      subTitle={props.subtitle}
      extra={props.buttons}
      tags={props.tag}
      avatar={props.avatar}
      footer={props.footer && props.footer}
    >
      {props.children}
    </Header>
  );
}
