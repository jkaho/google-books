import React, { useState, useRef, useEffect } from "react";
import API from "../../utils/API";
import SearchForm from "../../components/SearchForm";
import BookCard from "../../components/BookCard";
import { CenterFocusStrongOutlined } from "@material-ui/icons";
import "./style.css";

export default function Search() {
  // const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [savedBooks, setSavedBooks] = useState([]);

  const searchRef = useRef();
  // let results = [];

  // const handleSearchInput = () => {
    // const value = searchRef.current.children[1].children[0].value;
  //   setSearch(value);
  //   console.log(value)
  //   console.log(search)
  // };

  useEffect(() => {
    loadSavedBooks();
  }, []);

  const handleSearchButtonClick = () => {
    const query = searchRef.current.children[0].value;
    // setSearch(query);
    API.searchBook(query)
      .then(res => {
        // results = res.data.items;
        // setResults(res.data.items);
        searchRef.current.children[0].value = "";
        let searchResults = res.data.items;
        let neatResults = [];
        console.log(searchResults)

        searchResults.forEach(result => {
          let bookInfo = {};
          bookInfo.id = result.id;
          bookInfo.title = result.volumeInfo.title;
          result.volumeInfo.authors ?
            bookInfo.authors = result.volumeInfo.authors :
            bookInfo.authors = ""
          result.volumeInfo.imageLinks ?
            bookInfo.image = result.volumeInfo.imageLinks.thumbnail :
            bookInfo.image = ""
          result.volumeInfo.previewLink ?
            bookInfo.link = result.volumeInfo.previewLink :
            bookInfo.link = ""
          result.volumeInfo.description ?
            bookInfo.description = result.volumeInfo.description :
            bookInfo.description = "No description available for this book."

            let bookSaved = false;
            savedBooks.forEach(savedBook => {
              if (savedBook.bookId === result.id) {
                bookSaved = true;
                console.log("it's saved!")
                return;
              } 
            });

            if (bookSaved) {
              bookInfo.saved = true;
            } else {
              bookInfo.saved = false;
            }

          function pushResults() {
            neatResults.push(bookInfo);
          };

          pushResults();
        });
        setResults(neatResults);
      })
      .catch(err => console.log(err));
  };

  const loadSavedBooks = () => {
    API.getSavedBooks()
      .then(res => {
        setSavedBooks(res.data);
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
      <div className="book-results-heading">
        <div className="results-heading-col1">
          <h2>Search Results</h2>
        </div>
        <div className="results-heading-col2">
          1-20 out of 20 books
        </div>
      </div>
      {results.length > 0 ? 
        <div className="results-container">
          {results.map(result => (
            <BookCard
              key={result.id}
              id={result.id}
              title={result.title}
              authors={result.authors}
              description={result.description}
              imgAlt={`Cover of '${result.title}'`}
              img={result.image}
              link={result.link}
              saved={result.saved}
            />
          ))}
        </div>
        : <div className="no-results"></div>
      }
    </div>
  );
};