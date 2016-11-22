import React from 'react';
import { Route, IndexRoute, NotFound } from 'react-router';
import App from './components/App';
import About from './components/App/About';
import Error404 from './components/App/Error404';
import Home from './components/App/Home';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="about" component={About}/>
    <Route path="*" component={Error404}/>
  </Route>
)
