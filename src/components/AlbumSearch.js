import React, { Component } from 'react';

import history from '../history';

import './AlbumSearch.css';
import searchImage from '../assets/Search.svg';

class AlbumSearch extends Component {
  constructor() {
    super();
    this.state = {
      term: '',
    };
  }

  search(e) {
    e.preventDefault();
    const term = encodeURIComponent(this.state.term.trim());
    if (term) {
      history.push(`/search/${term}`);
      this.setState({ term: '' });
    }
  }

  updateTerm(e) {
    this.setState({ term: e.target.value });
  }

  render() {
    return (
      <form className="album-search" onSubmit={(e) => this.search(e)}>

        <input className="album-search-input"
               placeholder="Search..."
               value={this.state.term}
               onChange={(e) => this.updateTerm(e)}
               autoFocus />

        <button className="album-search-button"><img src={searchImage} alt="Search" /></button>
      </form>
    );
  }
}

export default AlbumSearch;
