import React from 'react'
import PropTypes from 'prop-types'

class BooksGrid extends React.Component {
    static propTypes = {
        books: PropTypes.array.isRequired
    }
    change = (event) => {
        console.log(event.target.value)
        console.log(event.target.name)
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
                              <select name={book.id} onChange={this.change}>
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
