import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchPage from "./SearchPage";
import MainPage from "./MainPage";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }
  
  switchShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);

    BooksAPI.getAll().then((books) => {
    this.setState({ books: books })
    })
   
  }


  render() {
    return (
      <div className="app">
      <Route
        exact
        path="/"
        render={() => (
          <MainPage books={this.state.books} switchShelf={this.switchShelf} />
        )}
      />
      <Route
        exact
        path="/search"
        render={() => (
          <SearchPage books={this.state.books} switchShelf={this.switchShelf} />
        )}
      />
    </div>
    )
  }
}

export default BooksApp
