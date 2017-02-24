import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import Layout from './views/Layout/Layout.jsx';
import Home from './views/Home/Home.jsx';
import About from './views/About/About.jsx';
import Work from './views/Work/Work.jsx';
import NoMatch from './views/NoMatch/NoMatch.jsx';


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
      <Route path="/about" component={About} />
      <Route path="/work" component={Work} />
      <Route path="/work/:urlId" component={Work} />
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>
), document.getElementById('app'));