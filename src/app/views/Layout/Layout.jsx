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
      screenType: 'default',
      page: '一句詠む'
    };
  },

  onChangeType(type){
    this.setState({
      screenType: type
    });
  },

  onChangePage(page){
    this.setState({
      page: page
    });
  },

  getScreenType() {
    return (this.state.screenType === 'default') ? style.wrap : style.fullscreen;
  },

  componentDidMount() {
    this.updatePage(this.props.location.pathname);
  },
  componentWillReceiveProps(nextProps) {
    this.updatePage(nextProps.location.pathname);
  },
  updatePage(pathname) {
    const pageNameObj = {
      home: '一句詠む',
      about: 'このサイトについて',
      work: '川柳一覧',
      noMatch: '四〇四'
    };
    let key;

    if (/^\/work/.test(pathname)) {
      key = 'work';
    }
    else if (/^\/about/.test(pathname)) {
      key = 'about';
    }
    else if (/^\/$/.test(pathname)) {
      key = 'home';
    }
    else {
      key = 'noMatch';
    }

    this.setState({
      page: pageNameObj[key]
    });
  },

  render(){
    return(
      <div className={this.getScreenType()}>
        <header className={style.header}>
          <div className={style.headerInner}>
            <h1>せんりう</h1>
            <h2 className={style.pageTitle}>{this.state.page}</h2>
            <div className={style.headerShare}>
              <span>
                <img src="/assets/i_share.svg" width="20" alt="共有する" />
              </span>
            </div>
          </div>
        </header>
        <nav className={style.nav}>
          <div className={style.navInner}>
            <ul>
              <li><Link to="/">一句詠む</Link></li>
              <li><Link to="/work/#">川柳一覧</Link></li>
              <li><Link to="/about">このサイトについて</Link></li>
            </ul>
          </div>
        </nav>
        <div className={style.contents}>
          {React.cloneElement(
            this.props.children,
            {onChange: this.onChangeType}
          )}
        </div>
      </div>
    )
  }
});
