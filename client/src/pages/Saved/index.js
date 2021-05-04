import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import Typography from "@material-ui/core/Typography";
import BookCard from "../../components/BookCard";
import "./style.css";
import PopupMessage from "../../components/PopupMessage";

export default function Saved() {
  const [savedBooks, setSavedBooks] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [titleToRemove, setTitleToRemove] = useState("");

  useEffect(() => {
    loadSavedBooks();
  }, []);

  const loadSavedBooks = () => {
    API.getSavedBooks()
      .then(res => {
        setSavedBooks(res.data.reverse());
      })
      .catch(err => console.log(err));
  };

  const handleRemoveButtonClick = (id) => {
    API.removeBook(id)
      // .then(res => console.log(`'${props.title}' has been removed from your saved books.`))
      .then(res => {
        console.log(res.data);
        setTitleToRemove(res.data.title);
      })
      .then(() => setPopupOpen(true))
      // .then(() => window.location.reload())
      .then(() => loadSavedBooks())
      .catch(err => console.log(err))
  };

  // Handle close for popup message
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setPopupOpen(false);
  };
  
  return (
    <div>
      <div className="saved-container">
        {savedBooks.length > 0 ? 
          <div>
            <h2>Saved Books</h2>
            {savedBooks.map(book => (
            <BookCard
              key={book.bookId}
              id={book.bookId}
              title={book.title}
              authors={book.authors}
              description={book.description}
              imgAlt={`Cover of '${book.title}'`}
              img={book.image}
              link={book.link}
              onClick={handleRemoveButtonClick}
            />
            ))}
          </div>
          : <div className="no-saved-books">
            <h2>No saved books</h2>
          </div>
        }
        <PopupMessage
          message={`"${titleToRemove}" successfully removed`}
          severity="success"
          handleClose={handleClose}
          open={popupOpen}
        />
      </div>
    </div>
  );
};