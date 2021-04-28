import React, { useState, useRef, useEffect } from "react";
import API from "../../utils/API";
import SearchForm from "../../components/SearchForm";
import BookCard from "../../components/BookCard";

export default function Search() {
  // const [search, setSearch] = useState("");
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
    // setSearch(query);
    API.searchBook(query)
      .then(res => {
        // results = res.data.items;
        // setResults(res.data.items);
        let searchResults = res.data.items;
        let neatResults = [];
        searchResults.forEach(result => {
          let bookInfo = {};
          bookInfo.title = result.volumeInfo.title;
          bookInfo.authors = result.volumeInfo.authors;
          bookInfo.image = result.volumeInfo.imageLinks.thumbnail;
          bookInfo.link = result.volumeInfo.previewLink;
          result.volumeInfo.description ?
            bookInfo.description = result.volumeInfo.description :
            bookInfo.description = "No description available for this book."
          neatResults.push(bookInfo);
        });

        setResults(neatResults);
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
              key={result.title}
              title={result.title}
              authors={result.authors}
              description={result.description}
              imgAlt={`Cover of '${result.title}'`}
              img={result.image}
              link={result.link}
            />
          ))}
        </div>
        : <div className="no-results">Search results</div>
      }
    </div>
  );
};