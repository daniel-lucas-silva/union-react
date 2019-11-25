import React, { useState } from 'react';
import Search from "antd/es/input/Search";
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
  root: {
    position: 'relative',
    top: -7,
  },
});

export interface SearchProps {
  placeholder?: string;
  width?: number;
  onSearch: (term: string) => void;
}
export function SearchBar(props: SearchProps) {
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Search
      className={classes.root}
      placeholder={props.placeholder || "Digite sua busca"}
      onSearch={value => console.log(value)}
      style={{ width: props.width || 250 }}
      loading={loading}
    />
  );
}
