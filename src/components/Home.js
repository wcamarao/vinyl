import React from 'react';

import AlbumSearch from './AlbumSearch';
import Logo from '../assets/Logo';

import './Home.css';

const Home = () => (
  <section className="home">
    <Logo />
    <AlbumSearch />
  </section>
);

export default Home;
