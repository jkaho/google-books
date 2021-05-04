import React, { useState, useEffect, useRef } from "react";
import API from "../../utils/API";
import SearchForm from "../../components/SearchForm";
import BookCard from "../../components/BookCard";
import PopupMessage from "../../components/PopupMessage";
import "./style.css";

export default function Search() {
  const [search, setSearch] = useState("google");
  const [results, setResults] = useState([]);
  const [savedBooks, setSavedBooks] = useState([]);
  const [searchWord, setSearchWord] = useState("google");
  const [popupOpen, setPopupOpen] = useState(false);
  const searchRef = useRef();
  let savedBooksStatic;

  useEffect(() => {
    // Load saved books upon first render to determine which btns should be disabled
    loadSavedBooks();
    // Default search for "google"
    handleSearchFormSubmit(event, search);
  }, []);

  // Change query value on input change
  const handleSearchInput = () => {
    const value = searchRef.current.children[0].value.trim();
    setSearch(value);
  };

  // Make GET request to Google Books API on form submit
  const handleSearchFormSubmit = (event, search) => {
    event.preventDefault();
    setSearchWord(searchRef.current.children[0].value.trim());
    API.searchBook(search)
      .then(res => {
        searchRef.current.children[0].value = "";
        let searchResults = res.data.items;
        let neatResults = [];

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
            if (savedBooks.length > 0) {
              savedBooks.forEach(savedBook => {
                if (savedBook.bookId === result.id) {
                  bookSaved = true;
                  return;
                } 
              });
            } else if (savedBooksStatic) {
              savedBooksStatic.forEach(savedBook => {
                if (savedBook.bookId === result.id) {
                  bookSaved = true;
                  return;
                } 
              });
            } 

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
      .catch(err => { 
        console.log(err);
        setPopupOpen(true);
      });
  };

  const loadSavedBooks = () => {
    API.getSavedBooks()
      .then(res => {
        setSavedBooks(res.data);
        savedBooksStatic = res.data;
      })
      .catch(err => {
        console.log(err);
        setPopupOpen(true);
      });
  };

  // Handle close for popup message
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setPopupOpen(false);
  };

  return (
    <div className="search-page">
      <SearchForm
        onChange={handleSearchInput}
        referrer={searchRef}
        onSubmit={handleSearchFormSubmit}
        search={search}
      />
      {results.length > 0 ? 
        <div>
          <div className="book-results-heading">
            <div className="results-heading-col1">
              <h2>Search results for "{searchWord ? searchWord : "google"}"</h2>
            </div>
            <div className="results-heading-col2">
              1-{results.length} out of {results.length} books
            </div>
          </div>
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
        </div>
        :
        <div className="no-results">
          <h2>No results found</h2>
        </div>
      }
      <PopupMessage
        message="An error occurred, please try again later"
        severity="error"
        handleClose={handleClose}
        open={popupOpen}
      />
    </div>
  );
};