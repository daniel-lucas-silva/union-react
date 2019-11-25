import React from 'react';

import logo from '../assets/logo.svg';
import logoWhite from '../assets/logo-white.svg';
import classes from '../styles/logo.module.less';

interface Props {
  theme?: "dark"|"light";
  alt?: string;
}
export default function(props: Props) {
  return (
    <div className={classes.root}>
      <img className={classes.img} src={props.theme === "dark" ? logoWhite : logo } alt={props.alt} {...props} />
    </div>
  );
}
