import React from "react";
import Typography from "@material-ui/core/Typography";
import BookCard from "../../components/BookCard";

export default function Saved() {
  return (
    <div>
      <div className="saved-container">
        <Typography variant="h3">Saved Books</Typography>
        <BookCard />
      </div>
    </div>
  );
};