import React from 'react'
import { Route, Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'

import './App.css'



class BooksApp extends React.Component {
  state = {
      books: new Map()
  }
  render() {
      return (
        <div className="app">
            <Route exact path="/" render={() => this.createMainPage() } />
            <Route path="/search" render={({ history }) =>  <SearchBooks changeBookToShelf={this.updateBookShelf} existingBooks={this.state.books} /> } />
        </div>
    )
  }
  componentDidMount() {
      const books = new Map()
      books.set('read', new Map())
      books.set('wantToRead', new Map())
      books.set('currentlyReading', new Map())
    
      BooksAPI.getAll().then(allBooks => {
          allBooks.forEach(aBook => books.get(aBook.shelf).set(aBook.id, aBook))
          this.setState({ books })
      })
  }
  shouldComponentUpdate(nextProps, nextState) {
      console.log("here")
          return true
  }
  getBooksFromShelf(shelf) {
      return (this.state.books.has(shelf))?
        [...this.state.books.get(shelf).values()] :
        []
  }
  changeBookToShelf(book, shelf) {
    const books = this.state.books
    if (shelf !== 'none' && !books.has(shelf))
        return
        
    BooksAPI.update({id: book.id}, shelf).then(r => {
        let theBook = books.get(book.shelf).get(book.id)
        books.get(book.shelf).delete(book.id)
        theBook.shelf = shelf;
        if (shelf !== 'none')
            books.get(shelf).set(book.id, theBook)

        this.setState({ books })
    })
  }
  updateBookShelf(book, shelf) {
    BooksAPI.update(book, shelf)
  }
  createMainPage() {
    return (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelf shelfTitle="Currently Reading" books={ this.getBooksFromShelf('currentlyReading') } changeBookToShelf={this.changeBookToShelf.bind(this)} />
              <BookShelf shelfTitle="Want to Read" books={ this.getBooksFromShelf('wantToRead') } changeBookToShelf={this.changeBookToShelf.bind(this)} />
              <BookShelf shelfTitle="Read" books={ this.getBooksFromShelf('read') } changeBookToShelf={this.changeBookToShelf.bind(this)} />
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )
  }

}

export default BooksApp
