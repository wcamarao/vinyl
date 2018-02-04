import React from 'react';
import { withRouter } from 'react-router-dom';
import Logo from './Logo';
import AlbumSearch from '../containers/AlbumSearch';
import './Home.css';

const Home = () => (
  <section className="home">
    <Logo />
    <AlbumSearch empty={true} />
  </section>
);

export default withRouter(Home);
