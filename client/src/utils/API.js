import axios from "axios";

const API = {
  searchBook: function(query) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}+intitle:${query}&maxResults=20&key=AIzaSyDKvDLYMy8N3_2BKyfyLke1o81felcyRuI`);
  },
  getSavedBooks: function() {
    return axios.get("/api/books");
  },
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  removeBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
};

export default API;