import React from "react";
import SearchForm from "../../components/SearchForm";
import BookCard from "../../components/BookCard";

export default function Search() {
  return (
    <div>
      <SearchForm />
      <div className="results-container">
        <BookCard />
      </div>
    </div>
  );
};