import axios from "axios";

const API = {
  searchBook: function(query) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}+intitle:${query}&maxResults=20&key=AIzaSyDKvDLYMy8N3_2BKyfyLke1o81felcyRuI`)
  },
};

export default API;