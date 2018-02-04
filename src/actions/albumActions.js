import axios from 'axios';

import { parseLookupResponse } from '../shapes/albumShape';

const SEARCH_ALBUMS_ENDPOINT = '//itunes.apple.com/search?entity=album&term=';
const LOOKUP_SONGS_ENDPOINT = '//itunes.apple.com/lookup?entity=song&id=';

export const REQUEST_ALBUMS = 'REQUEST_ALBUMS';
export const RECEIVE_ALBUMS = 'RECEIVE_ALBUMS';
export const REQUEST_ALBUM = 'REQUEST_ALBUM';
export const RECEIVE_ALBUM = 'RECEIVE_ALBUM';

export const searchAlbums = (term) => {
  return (dispatch, getState) => {
    if (getState().albumReducer.isLoading) {
      return;
    }

    dispatch(requestAlbums(term));
    return axios.get(`${SEARCH_ALBUMS_ENDPOINT}${term}`)
      .then(response => dispatch(receiveAlbums(response.data.results)));
  };
};

export const viewAlbum = (id) => {
  return (dispatch, getState) => {
    if (getState().albumReducer.isLoading) {
      return;
    }

    dispatch(requestAlbum());
    return axios.get(`${LOOKUP_SONGS_ENDPOINT}${id}`)
      .then(response => dispatch(receiveAlbum(parseLookupResponse(response.data))));
  };
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
