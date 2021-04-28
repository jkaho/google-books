import React, { useEffect, useState, useRef } from "react";
import API from "../../utils/API";
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

export default function SearchForm() {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const searchRef = useRef();

  const handleSearchInput = () => {
    setSearch(searchRef.current.children[1].children[0].value);
  };

  const handleSearchButtonClick = () => {
    API.searchBook(search)
      .then(res => {
        setResults(res.data.items);
      })
      .catch(err => console.log(err))
  };

  return (
    <div className="search-container">
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Search for a book title"
          variant="outlined" 
          ref={searchRef}
          onChange={handleSearchInput}
        />
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<SearchIcon />}
          disableElevation
          onClick={handleSearchButtonClick}
        >
          Search
        </Button>      
      </form>
    </div>
  )
};