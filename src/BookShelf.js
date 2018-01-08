import React from 'react'
import PropTypes from 'prop-types'
import BooksGrid from './BooksGrid'

class BookShelf extends React.Component {
    static propTypes = {
        shelfTitle: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired
    }
    render() {
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
          <div className="bookshelf-books">
            <BooksGrid books={this.props.books} />
          </div>
        <div/>
    }

}


export default BookShelf
