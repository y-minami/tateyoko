import React from 'react';
import WebFont from 'webfontloader';
import {Router, Route, Link, browserHistory} from 'react-router';

import Home from '../Home/Home.jsx';

import style from './Layout.css';

WebFont.load({
  custom: {
    familes: [
      'Hannari',
      'Sawarabi Mincho'
    ],
    urls: [
      'https://fonts.googleapis.com/earlyaccess/hannari.css',
      'https://fonts.googleapis.com/earlyaccess/sawarabimincho.css'
    ]
  },
  timeout: 3000
})

export default React.createClass({
  getInitialState() {
    return {
      screenType: 'default'
    };
  },

  onChangeType(type){
    this.setState({
      screenType: type
    });
  },

  getScreenType() {
    return (this.state.screenType === 'default') ? style.wrap : style.fullscreen;
  },

  render(){
    return(
      <div className={this.getScreenType()}>
        <header className={style.header}>
          <div className={style.headerInner}>
            <h1><Link to="/">せんりう</Link></h1>
            <p className={style.headerShare}>共有</p> 
          </div>
        </header>
        <nav className={style.nav}>
          <div className={style.navInner}>
            <ul>
              <li><Link to="/">一句詠む</Link></li>
              <li><Link to="/works">川柳一覧</Link></li>
              <li><Link to="/about">このサイトについて</Link></li>
            </ul>
          </div>
        </nav>
        <div className={style.contents}>
          {this.props.children || <Home onChange={this.onChangeType} />}
        </div>
      </div>
    )
  }
});
