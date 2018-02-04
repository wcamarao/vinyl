import React from 'react';

import './Loading.css';

const Loading = () => (
  <figure className="loading-wrapper">
    <svg className="loading" viewBox="25 25 50 50">
      <circle className="loading-circle" cx="50" cy="50" r="20" fill="none" stroke="#333" strokeWidth="2" />
    </svg>
  </figure>
);

export default Loading;
