import React from 'react'
import { Route, Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'

import './App.css'



class BooksApp extends React.Component {
  state = {
      read: [],
      currentlyReading: [],
      wantToRead: []
  }
  render() {
      BooksAPI.get("bUybAgAAQBAJ").then(d => console.log(d))
      return (
        <div className="app">
            <Route exact path="/" render={() => this.createMainPage() } />
            <Route path="/search" render={() =>  <SearchBooks /> } />
        </div>
    )
  }
  componentDidMount() {
      BooksAPI.getAll().then(books => {
          let read = [], currentlyReading = [], wantToRead = []
          books.forEach(book => {
            switch (book.shelf) {
                case "read":
                    read.push(book)
                    break
                case "wantToRead":
                    wantToRead.push(book)
                    break
                case "currentlyReading":
                   currentlyReading.push(book)
                   break 
                default:
            }      
          })   
          this.setState({ read, currentlyReading, wantToRead })
      })
  }
  createMainPage() {
    const { read, currentlyReading, wantToRead } = this.state

    return (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelf shelfTitle="Currently Reading" books={currentlyReading} />
              <BookShelf shelfTitle="Want to Read" books={wantToRead} />
              <BookShelf shelfTitle="Read" books={read} />
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )
  }

}

export default BooksApp
