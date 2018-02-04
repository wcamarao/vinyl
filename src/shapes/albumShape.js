import PropTypes from 'prop-types';

export const trackShape = PropTypes.shape({
  trackNumber: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  trackTime: PropTypes.string.isRequired,
  trackPrice: PropTypes.number.isRequired,
});

const albumGridProps = {
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
};

const albumDetailProps = Object.assign({}, albumGridProps, {
  primaryGenreName: PropTypes.string.isRequired,
  copyright: PropTypes.string.isRequired,
  collectionPrice: PropTypes.number.isRequired,
  artworkUrl300: PropTypes.string.isRequired,
  formattedReleaseDate: PropTypes.string.isRequired,
  tracks: PropTypes.arrayOf(trackShape).isRequired,
  contentAdvisoryRating: PropTypes.string,
});

export const albumGridShape = PropTypes.shape(albumGridProps);
export const albumDetailShape = PropTypes.shape(albumDetailProps);

const dateTimeFormatter = new Intl.DateTimeFormat('en-AU', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

const parseTrackTime = (millis) => {
  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

export const parseLookupResponse = (response) => {
  const album = response.results && response.results[0];
  if (!album) {
    return null;
  }

  return Object.assign({}, album, {
    artworkUrl300: album.artworkUrl100.replace('100x100', '300x300'),
    formattedReleaseDate: dateTimeFormatter.format(new Date(album.releaseDate)),
    tracks: response.results.slice(1).map(track => Object.assign(track, {
      trackTime: parseTrackTime(track.trackTimeMillis),
    })),
  });
};
