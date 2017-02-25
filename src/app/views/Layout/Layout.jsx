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
      page: '一句詠む',
      selected: '/'
    };
  },

  changeLayout(type){
    this.setState({
      screenType: type
    }, ()=>{

    });

    window.scrollTo(0, 1);
  },

  changePageTitle(title) {
    this.setState({
      page: title
    });
  },

  changeNavActive(selected) {
    this.setState({
      selected: selected
    });

    window.scrollTo(0, 1);
  },

  getScreenType() {
    return (this.state.screenType === 'default') ? style.wrap : style[this.state.screenType];
  },

  isActiveNav(selected) {
    return (this.state.selected === selected) ? style.navSelected : '';
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
              <li><Link to="/" className={this.isActiveNav('/')}>一句詠む</Link></li>
              <li><Link to="/work/#" className={this.isActiveNav('/work')}>川柳一覧</Link></li>
              <li><Link to="/about" className={this.isActiveNav('/about')}>このサイトについて</Link></li>
            </ul>
          </div>
        </nav>
        <div className={style.contents}>
          {React.cloneElement(
            this.props.children,
            {
              changeLayout: this.changeLayout,
              changePageTitle: this.changePageTitle,
              changeNavActive: this.changeNavActive
            }
          )}
        </div>
      </div>
    )
  }
});
