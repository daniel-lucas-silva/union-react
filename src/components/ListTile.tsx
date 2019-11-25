import React from 'react';
import {Link} from "react-router-dom";


export interface ListTileProps {
  url?: string;
  onClick?: () => void;
  avatar?: boolean;
  leading?: string;
  trailing?: JSX.Element;
  title: string;
  subtitle?: string;
}

export function ListTile({url, onClick, avatar, leading, trailing, title, subtitle}: ListTileProps) {

  return (
    <div
      // component={!!url ? props => <Link to={url} {...props} /> : 'div'}
      onClick={onClick}
    >
      {!!leading && <div>{leading}</div>}
      {!!avatar && avatar}
      {/*<ListItemText*/}
      {/*  primary={title}*/}
      {/*  secondary={subtitle}*/}
      {/*/>*/}
      {!!trailing && <div>{trailing}</div>}
    </div>
  );
}
