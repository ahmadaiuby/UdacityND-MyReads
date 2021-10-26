import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import { Link } from "react-router-dom";

class SearchPage extends Component {

    state = {
      query: '',
      booksSearch: []
    }

    updateQuery = (query) => {
      this.setState({
        query: query
      })
      this.updateSearchBooks(query);
    }
    updateSearchBooks = (query) => {
      if (query) {
        BooksAPI.search(query).then((booksSearch) => {
          if (booksSearch.error) {
            this.setState({ booksSearch: []});
          } else {
            this.setState({ booksSearch: booksSearch })
          }
        })
      } else {
        this.setState({ booksSearch: [] });
      }
      
    }

    render() {
        return (
            <div>
                <div className="search-books">
                <div className="search-books-bar">
                <Link className="close-search" to="/">
                  Close
                </Link>
                <div className="search-books-input-wrapper">

                <input type="text" 
                placeholder="Search by title or author" 
                value={this.props.query}
                onChange={(e) => this.updateQuery(e.target.value)}

                />
              </div>
              </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {
                this.state.booksSearch.map(booksSearch => (
                  <li key={booksSearch.id}> 
                    <Book
                      book={booksSearch}
                      switchShelf={this.props.switchShelf}
                    />
                  </li>
                ))
                }

              </ol>
            </div>
          </div>
            </div>
        )
    }
}

export default SearchPage;
