import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import AlbumDetails from './AlbumDetails';
import AlbumGrid from '../containers/AlbumGrid';
import AlbumSearch from '../containers/AlbumSearch';
import Logo from './Logo';
import NotFound from './NotFound';
import './Layout.css';

const Layout = () => (
  <section className="layout">
    <header className="layout-header">
      <Link className="layout-logo-anchor" to="/">
        <Logo />
      </Link>

      <AlbumSearch />
    </header>

    <main className="layout-content">
      <Switch>
        <Route path="/search/:term" component={AlbumGrid}/>
        <Route path="/album/:id" component={AlbumDetails}/>
        <Route component={NotFound}/>
      </Switch>
    </main>
  </section>
);

export default Layout;
