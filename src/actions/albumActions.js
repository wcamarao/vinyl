import fetch from 'cross-fetch';
import history from '../history';

const SEARCH_ALBUMS_ENDPOINT = '//itunes.apple.com/search?entity=album&term='
const LOOKUP_SONGS_ENDPOINT = '//itunes.apple.com/lookup?entity=song&id='

export const REQUEST_ALBUMS = 'REQUEST_ALBUMS';
export const RECEIVE_ALBUMS = 'RECEIVE_ALBUMS';
export const REQUEST_ALBUM = 'REQUEST_ALBUM';
export const RECEIVE_ALBUM = 'RECEIVE_ALBUM';

export const searchAlbums = (term) => {
  return (dispatch) => {
    dispatch(requestAlbums(term));
    history.push(`/search/${term.trim().replace(/\s+/g, '+')}`);
    return fetch(`${SEARCH_ALBUMS_ENDPOINT}${term}`)
      .then(responseText => responseText.json())
      .then(response => dispatch(receiveAlbums(response.results)));
  };
};

export const viewAlbum = (id) => {
  return (dispatch) => {
    dispatch(requestAlbum());
    return fetch(`${LOOKUP_SONGS_ENDPOINT}${id}`)
      .then(responseText => responseText.json())
      .then(response => dispatch(receiveAlbum(parseLookupResponse(response))));
  };
};

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

const parseLookupResponse = (response) => {
  const album = response.results[0];
  return Object.assign(album, {
    artworkUrl300: album.artworkUrl100.replace('100x100', '300x300'),
    formattedReleaseDate: dateTimeFormatter.format(new Date(album.releaseDate)),
    tracks: response.results.slice(1).map(track => Object.assign(track, {
      trackTime: parseTrackTime(track.trackTimeMillis),
    })),
  });
};

const requestAlbums = (term) => ({
  type: REQUEST_ALBUMS,
  term,
});

const receiveAlbums = (albums) => ({
  type: RECEIVE_ALBUMS,
  albums,
});

const requestAlbum = () => ({
  type: REQUEST_ALBUM,
});

const receiveAlbum = (album) => ({
  type: RECEIVE_ALBUM,
  album,
});
