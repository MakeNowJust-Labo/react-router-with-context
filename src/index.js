// This file is client side entry point.

import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';

import IndexPage from './pages/IndexPage';
import UserPage from './pages/UserPage';
import {UsersProvider} from './models/users';

ReactDOM.render(
  <UsersProvider>
    <BrowserRouter>
      <div>
        <h1>
          <Link to="/">React Router with Context API</Link>
        </h1>

        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/user/:id" component={UserPage} />
        </Switch>
      </div>
    </BrowserRouter>
  </UsersProvider>,
  document.querySelector('#app'),
);
