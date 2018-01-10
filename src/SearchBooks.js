import React from 'react'
import { Link } from 'react-router-dom'
import { search } from './BooksAPI'
import BooksGrid from './BooksGrid' 

class SearchBooks extends React.Component {
    state = {
        query: '',
        searchedBooks: []
    }
    setQuery = (query) => {
        this.setState({ query })
        this.searchBooksFromApi(query)
    }
    searchBooksFromApi = (query) => {
        if (!query) {
            this.setState({ searchedBooks: [] })   
            return
        }
        search(query).then(d => {
          if (d instanceof Array && d.length !== 0) {
              this.setState({ searchedBooks:  d })
          } else {
              this.setState({ searchedBooks: [] })
          }
        })
    }
    render() {
      const { query, searchedBooks } = this.state
      return (
              <div className="search-books">
                  <div className="search-books-bar">
                  <Link className="close-search" to="/">Close</Link>
                  <div className="search-books-input-wrapper">
                  {/*
                      NOTES: The search from BooksAPI is limited to a particular set of search terms.
                      You can find these search terms here:
                      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                      you don't find a specific author or title. Every search is limited by search terms.
                      */}
                  <input 
                    type="text" 
                    placeholder="Search by title or author" 
                    value={query}
                    onChange={(event) => this.setQuery(event.target.value)} />

                  </div>
                  </div>
                  <div className="search-books-results">
                      <ol className="books-grid">
                        <BooksGrid books={searchedBooks} changeBookToShelf={this.props.changeBookToShelf}  />
                      </ol>
                  </div>
              </div>
              )
    }
}


export default SearchBooks
