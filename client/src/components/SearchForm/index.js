import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import clsx from 'clsx';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import "./style.css";

const useStyles = makeStyles((theme) => ({
  button: {
  },
  margin: {
    margin: theme.spacing(2),
  },
  textField: {
    width: '40ch',
  },
}));

export default function SearchForm(props) {
  const classes = useStyles();
  return (
    <div className="search-container">
      <form noValidate autoComplete="off" onSubmit={props.onSubmit}
>
        {/* <TextField
          id="standard-basic"
          label="Search for a book title"
          variant="standard" 
          ref={props.referrer}
          onChange={props.onChange}
        /> */}
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-search">Search for a book title</InputLabel>
          <OutlinedInput
            ref={props.referrer}
            id="outlined-adornment-search"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  className={classes.button}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            labelWidth={160}
          />
        </FormControl>      
      </form>
    </div>
  )
};