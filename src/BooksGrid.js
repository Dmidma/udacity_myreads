import React from 'react'
import PropTypes from 'prop-types'

class BooksGrid extends React.Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        changeBookToShelf: PropTypes.func.isRequired
    }
    state = {
        books: []
    }
    componentDidMount() {
        this.setState({ books: this.props.books })
    }
    change = (event) => {
        const bookId = event.target.name
        const newBookShelf = event.target.value
        const currentShelf = this.getCurrentShelfOfBook(event.target.name)
        // do not proceed if the self is the same as the previous one
        if (currentShelf === newBookShelf)
            return
        
        this.props.changeBookToShelf({id: bookId, shelf: currentShelf}, newBookShelf)
        const books = this.props.books

        books.find(book => book.id === bookId).shelf = newBookShelf

        this.setState({ books })
    }
    getCurrentShelfOfBook(bookId) {
        return this.props.books.find(b => b.id === bookId).shelf
    }
    getShelfOfBook(book) {
        return (book.shelf)? book.shelf : 'none'
    }
    render() {
        const { books } = this.props
        return (
                <ol className="books-grid">
                    {books.map((book) => (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select name={book.id} onChange={this.change} value={this.getShelfOfBook(book) } >
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>
                    ))} 
                </ol>
        )
    }

}


export default BooksGrid
