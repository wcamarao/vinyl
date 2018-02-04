import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchAlbums } from '../actions/albumActions';
import searchImage from '../assets/search.svg';
import './AlbumSearch.css';

class AlbumSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: props.empty ? '' : props.term,
    };
  }

  search(e) {
    e.preventDefault();
    if (this.state.term) {
      this.props.searchAlbums(this.state.term);
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

const mapStateToProps = (state) => ({
  term: state.albumReducer.term,
});

const mapDispatchToProps = {
  searchAlbums,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlbumSearch);
