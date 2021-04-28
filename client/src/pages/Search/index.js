import React, { useState, useRef, useEffect } from "react";
import API from "../../utils/API";
import SearchForm from "../../components/SearchForm";
import BookCard from "../../components/BookCard";

export default function Search() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const searchRef = useRef();
  // let results = [];

  // const handleSearchInput = () => {
    // const value = searchRef.current.children[1].children[0].value;
  //   setSearch(value);
  //   console.log(value)
  //   console.log(search)
  // };

  const handleSearchButtonClick = () => {
    const query = searchRef.current.children[1].children[0].value;
    setSearch(query);
    API.searchBook(query)
      .then(res => {
        // results = res.data.items;
        setResults(res.data.items);
        console.log(res.data.items)
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <SearchForm
        // onChange={handleSearchInput}
        referrer={searchRef}
        onClick={handleSearchButtonClick}
      />
      {results.length > 1 ? 
        <div className="results-container">
          {results.map(result => (
            <BookCard
              key={result.volumeInfo.title}
              title={result.volumeInfo.title}
              authors={result.volumeInfo.authors}
              imgAlt={`Cover of '${result.volumeInfo.title}'`}
              img={result.volumeInfo.imageLinks.thumbnail}
            />
          ))}
        </div>
        : <div className="no-results">Search results</div>
      }
    </div>
  );
};