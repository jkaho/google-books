import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    },
  },
  button: {
    // margin: theme.spacing(1),
    width: "fit-content",
    height: "55px"
  },
}));

export default function SearchForm(props) {
  const classes = useStyles();
  return (
    <div className="search-container">
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Search for a book title"
          variant="outlined" 
          ref={props.referrer}
          // onChange={props.onChange}
        />
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<SearchIcon />}
          disableElevation
          onClick={props.onClick}
        >
          Search
        </Button>      
      </form>
    </div>
  )
};