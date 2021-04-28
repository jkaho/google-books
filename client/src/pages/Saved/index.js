import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import Typography from "@material-ui/core/Typography";
import BookCard from "../../components/BookCard";

export default function Saved() {
  const [savedBooks, setSavedBooks] = useState([]);

  useEffect(() => {
    loadSavedBooks();
  }, []);

  const loadSavedBooks = () => {
    API.getSavedBooks()
      .then(res => {
        setSavedBooks(res.data);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <div className="saved-container">
        <Typography variant="h3">Saved Books</Typography>
        {savedBooks.length > 0 ? savedBooks.map(book => (
          <BookCard
          key={book.bookId}
          id={book.bookId}
          title={book.title}
          authors={book.authors}
          description={book.description}
          imgAlt={`Cover of '${book.title}'`}
          img={book.image}
          link={book.link}
          />
          )) : <div className="no-saved-books">No saved books</div>
        }
      </div>
    </div>
  );
};