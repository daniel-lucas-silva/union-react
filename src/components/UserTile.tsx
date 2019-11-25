import React from 'react';
import classes from '../styles/user-tile.module.less';

export interface UserTileProps {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  title: string;
  subtitle: string;
}

export function UserTile({leading, trailing, title, subtitle}: UserTileProps) {
  return (
    <div className={classes.root}>
      { leading && <div className={classes.leading}> {leading} </div> }
      <div className={classes.center}>
        <h2 className={classes.h2}>{title}</h2>
        <p className={classes.p}>{subtitle}</p>
      </div>
      { trailing && <div className={classes.trailing}> {trailing} </div> }
    </div>
  );
}
