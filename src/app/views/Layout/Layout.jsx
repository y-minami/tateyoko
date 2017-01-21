import React from 'react';
import WebFont from 'webfontloader';
import {Router, Route, Link, browserHistory} from 'react-router';

import Home from '../Home/Home.jsx';

import style from './Layout.css';

WebFont.load({
  custom: {
    familes: ['Hannari'],
    urls: ['https://fonts.googleapis.com/earlyaccess/hannari.css']
  },
  timeout: 3000
})

export default React.createClass({
  render(){
    return(
      <div className={style.wrap}>
        <header className={style.header}>
          <div className={style.headerInner}>
            <h1>せんりう</h1>
            <ul>
              <li><Link to="/">最初に戻る</Link></li>
              <li><Link to="/works">作品集</Link></li>
              <li><Link to="/about">このサイトについて</Link></li>
            </ul>
          </div>
        </header>
        <div className={style.contents}>
          {this.props.children || <Home />}
        </div>
      </div>
    )
  }
});
