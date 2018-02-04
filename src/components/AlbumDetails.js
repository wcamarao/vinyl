import React, { Component } from 'react';
import { connect } from 'react-redux';
import { viewAlbum } from '../actions/albumActions';
import AlbumTrack from './AlbumTrack';
import './AlbumDetails.css';

class AlbumDetails extends Component {
  componentDidMount() {
    this.props.viewAlbum(this.props.match.params.id);
  }

  render() {
    const album = this.props.album;

    if (!album) {
      return null;
    }

    return (
      <article className="album-details">
        <figure className="album-details-artwork-wrapper">
          <img className="album-details-artwork"
              alt={album.collectionName}
              src={album.artworkUrl300} />
        </figure>

        <section className="album-details-card">
          <h2>{album.collectionName}</h2>
          <h3>{album.artistName}</h3>

          <div>{album.primaryGenreName}</div>
          <div>{album.contentAdvisoryRating}</div>
          <div>{album.tracks.length} tracks</div>
          <div className="album-details-release-date">
            Released <time>{album.formattedReleaseDate}</time>
          </div>
          <div>{album.copyright}</div>

          <h5>${album.collectionPrice}</h5>
        </section>

        <ol className="album-details-track-list">
          <li className="album-track album-track-header">
            <span className="album-track-number">#</span>
            <span className="album-track-name">NAME</span>
            <div className="album-track-right-column">
              <time className="album-track-time">TIME</time>
              <span className="album-track-price">PRICE</span>
            </div>
          </li>

          {album.tracks.map(track =>
            <AlbumTrack key={track.trackId} track={track} />
          )}
        </ol>

      </article>
    );
  }
}

const mapStateToProps = (state) => ({
  album: state.albumReducer.album,
});

const mapDispatchToProps = {
  viewAlbum,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlbumDetails);
