import React, { useState, useRef, useEffect } from "react";
import API from "../../utils/API";
import SearchForm from "../../components/SearchForm";
import BookCard from "../../components/BookCard";
import { CenterFocusStrongOutlined } from "@material-ui/icons";
import "./style.css";

export default function Search() {
  const [search, setSearch] = useState("google");
  const [results, setResults] = useState([]);
  const [savedBooks, setSavedBooks] = useState([]);
  const [searchWord, setSearchWord] = useState("google");
  let savedBooksStatic;

  const searchRef = useRef();

  useEffect(() => {
    loadSavedBooks();
    handleSearchButtonClick(event, search);
  }, []);

  const handleSearchInput = () => {
    const value = searchRef.current.children[0].value.trim();
    setSearch(value);
  };

  const handleSearchButtonClick = (event, search) => {
    event.preventDefault();
    // const query = searchRef.current.children[0].value;
    // setSearch(query);
    setSearchWord(searchRef.current.children[0].value.trim());
    API.searchBook(search)
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
            if (savedBooks.length > 0) {
              savedBooks.forEach(savedBook => {
                if (savedBook.bookId === result.id) {
                  bookSaved = true;
                  return;
                } 
              });
            } else {
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
      .catch(err => console.log(err));
  };

  const loadSavedBooks = () => {
    API.getSavedBooks()
      .then(res => {
        setSavedBooks(res.data);
        savedBooksStatic = res.data;
        console.log(savedBooksStatic)
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="search-page">
      <SearchForm
        onChange={handleSearchInput}
        referrer={searchRef}
        onSubmit={handleSearchButtonClick}
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
    </div>
  );
};