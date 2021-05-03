import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import "./style.css";
import { BusinessTwoTone } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
  },
  appBar: {
    background: "white",
    color: "black",
  }
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar} elevation={0}>
        <Toolbar>
          <div className="app-logo">
            <Link to="/" style={{ textDecoration: "none" }}>
              <span id="g">G</span>
              <span id="o">o</span>
              <span id="o2">o</span>
              <span id="g2">g</span>
              <span id="l">l</span>
              <span id="e">e</span>&nbsp;
              <span id="books-search">Books</span>&nbsp;
              <span id="search-span">Search</span>
            </Link>
          </div>
          <Button><Link id="search-navlink" to="/">Search</Link></Button>
          <Button><Link id="saved-navlink" to="/saved">Saved</Link></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
