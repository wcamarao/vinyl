import { Link } from 'react-router-dom';
import React from 'react';

import { albumGridShape } from '../shapes/albumShape';

import './AlbumGridItem.css';

const AlbumGridItem = ({ album }) => (
  <Link className="album-grid-item" to={`/album/${album.collectionId}`}>
    <img className="album-grid-item-artwork"
         alt={album.collectionName}
         src={album.artworkUrl100} />

    <section className="album-grid-item-info">
      <div className="album-grid-item-collection">{album.collectionName}</div>
      <div className="album-grid-item-artist">{album.artistName}</div>
    </section>
  </Link>
);

AlbumGridItem.propTypes = {
  album: albumGridShape,
};

export default AlbumGridItem;
