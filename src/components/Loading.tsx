import React from 'react';
import {createUseStyles} from 'react-jss';
import {Spin} from "antd";

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});

export default function() {
  const classes = useStyles();

  return <Spin className={classes.root} tip="Carregando..."/>;
}
