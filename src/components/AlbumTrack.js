import React from 'react';

import { trackShape } from '../shapes/albumShape';

import './AlbumTrack.css';

const AlbumTrack = ({ track }) => (
  <li className="album-track">
    <span className="album-track-number">{track.trackNumber}. </span>
    <span className="album-track-name">{track.trackName}</span>
    <div className="album-track-right-column">
      <time className="album-track-time">{track.trackTime}</time>
      <span className="album-track-price">${track.trackPrice}</span>
    </div>
  </li>
);

AlbumTrack.propTypes = {
  track: trackShape,
};

export default AlbumTrack;
