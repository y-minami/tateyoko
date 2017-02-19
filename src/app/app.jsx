import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import Layout from './views/Layout/Layout.jsx';
import About from './views/About/About.jsx';
import Works from './views/Works/Works.jsx';
import Work from './views/Work/Work.jsx';
import NoMatch from './views/NoMatch/NoMatch.jsx';


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <Route path="/about" component={About} />
      <Route path="/works" component={Works} />
      <Route path="/work/:urlId" component={Work} />
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>
), document.getElementById('app'));