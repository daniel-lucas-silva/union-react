import React from 'react';
import {createUseStyles} from "react-jss";
import LoginForm from "../forms/LoginForm";
import Logo from "../../components/Logo";

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  logo: {
    width: 270,
    marginBottom: 17
  }
});

export default function() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.logo}>
        <Logo alt="Union Poker" />
      </div>
      <LoginForm />
    </div>
  );
}
