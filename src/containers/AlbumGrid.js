import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchAlbums } from '../actions/albumActions';
import AlbumGridItem from '../components/AlbumGridItem';
import './AlbumGrid.css';

class AlbumGrid extends Component {
  componentDidMount() {
    if (!this.props.term) {
      this.props.searchAlbums(this.props.match.params.term);
    }
  }

  render() {
    return (
      <section className="album-grid">
        <header className="album-grid-headline">
          Showing <strong>{this.props.albums.length}</strong> albums
          matching <strong>{this.props.term}</strong>
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

const mapStateToProps = (state) => ({
  albums: state.albumReducer.albums,
  term: state.albumReducer.term,
});

const mapDispatchToProps = {
  searchAlbums,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlbumGrid);
