import {
  REQUEST_ALBUMS,
  RECEIVE_ALBUMS,
  REQUEST_ALBUM,
  RECEIVE_ALBUM,
} from '../actions/albumActions';

const initialState = {
  album: null,
  albums: [],
  isLoading: false,
  term: '',
};

const albumReducer = (state = initialState, action) => {
  switch (action.type) {

    case REQUEST_ALBUMS:
      return {
        ...state,
        albums: [],
        isLoading: true,
        term: action.term,
      };

    case RECEIVE_ALBUMS:
      return {
        ...state,
        albums: action.albums,
        isLoading: false,
      };

    case REQUEST_ALBUM:
      return {
        ...state,
        isLoading: true,
        album: null,
      };

    case RECEIVE_ALBUM:
      return {
        ...state,
        isLoading: false,
        album: action.album,
      };

    default:
      return state;
  }
};

export default albumReducer;
