import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { albumGridShape } from '../shapes/albumShape';
import { searchAlbums } from '../actions/albumActions';
import AlbumGridItem from '../components/AlbumGridItem';
import history from '../history';
import Loading from '../assets/Loading';

import './AlbumGrid.css';

class AlbumGrid extends Component {
  componentDidMount() {
    this.props.searchAlbums(this.props.match.params.term);
    this.removeHistoryListener = history.listen((location) => {
      const prefix = '/search/';
      if (location.pathname.toLowerCase().startsWith(prefix)) {
        this.props.searchAlbums(location.pathname.substr(prefix.length)); // :|
      }
    });
  }

  componentWillUnmount() {
    this.removeHistoryListener();
  }

  render() {
    if (this.props.isLoading) {
      return <Loading />;
    }

    return (
      <section className="album-grid">
        <header className="album-grid-headline">
          Showing <strong>{this.props.albums.length}</strong> albums
          matching <strong>{decodeURIComponent(this.props.term)}</strong>
        </header>

        <nav className="album-grid-items">
          {this.props.albums.map(album =>
            <AlbumGridItem key={album.collectionId} album={album} />
          )}
        </nav>
      </section>
    );
  }
}

AlbumGrid.propTypes = {
  albums: PropTypes.arrayOf(albumGridShape).isRequired,
  isLoading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  searchAlbums: PropTypes.func.isRequired,
  term: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  albums: state.albumReducer.albums,
  isLoading: state.albumReducer.isLoading,
  term: state.albumReducer.term,
});

const mapDispatchToProps = {
  searchAlbums,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlbumGrid);
