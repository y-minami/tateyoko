import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';
import Velocity from 'velocity-animate';

import style from './Home.css';

import Theme from './Theme.jsx';
import Input from './Input.jsx';

export default React.createClass({
  getInitialState() {
    return {
      theme: [],
      themeId: '',
      themeTitle: '',
      author: '',
      col1: '',
      col2: '',
      col3: '',
      isSenriuActive: true
    };
  },

  componentDidMount() {
    request
      .get('/api/theme')
      .end((err, res)=>{
        if (err) {
          return;
        }

        this.setState({
          theme: res.body
        });
      });
  },

  fadeIn(dom) {
    dom.style.display = 'block';
    dom.style.opacity = 0;

    Velocity(dom, {
      opacity: 1
    });
  },

  fadeOut(dom) {
    Velocity(dom, {
      opacity: 0
    },{
      complete: ()=>{
        dom.style.display = 'none';
      }
    });

  },

  onChangeTheme(themeId, themeTitle) {
    this.setState({
      themeId,
      themeTitle
    });
  },

  onClickNextPhase2() {
    // layoutのclass変更
    this.props.onChange('fullscreen');

    // 入力枠を初期化
    this.setState({
      isSenriuActive: true
    });

    let phase1 = document.getElementById(style.phase1);
    let senriu = document.getElementById(style.senriu);
    let selectTheme = document.getElementById(style.selectTheme);
    let backPhase1 = document.getElementById(style.backPhase1);
    let nextView = document.getElementById(style.nextView);

    this.fadeOut(phase1);
    this.fadeIn(backPhase1);
    this.fadeIn(nextView);
    this.fadeIn(senriu);
    this.fadeIn(selectTheme);
  },

  onClickBackPhase1() {
    // layoutのclass変更
    this.props.onChange('default');

    let phase1 = document.getElementById(style.phase1);
    let senriu = document.getElementById(style.senriu);
    let selectTheme = document.getElementById(style.selectTheme);
    let backPhase1 = document.getElementById(style.backPhase1);
    let nextView = document.getElementById(style.nextView);

    this.fadeOut(senriu);
    this.fadeOut(selectTheme);
    this.fadeOut(backPhase1);
    this.fadeOut(nextView);

    this.fadeIn(phase1);
  },

  onClickNextView() {
    // layoutのclass変更
    this.props.onChange('default');

    // 川柳の枠を削除
    this.setState({
      isSenriuActive: false
    });

    // fadein
    let backPhase2 = document.getElementById(style.backPhase2);
    let submit =  document.getElementById(style.submit);

    this.fadeIn(backPhase2);
    this.fadeIn(submit);

    // fadeout
    let selectTheme = document.getElementById(style.selectTheme);
    let backPhase1 = document.getElementById(style.backPhase1);
    let nextView = document.getElementById(style.nextView);

    this.fadeOut(selectTheme);
    this.fadeOut(backPhase1);
    this.fadeOut(nextView);
  },

  onClickBackPhase2() {
    // layoutのclass変更
    this.props.onChange('fullscreen');

    // 入力枠を初期化
    this.setState({
      isSenriuActive: true
    });

    // fadein
    let senriu = document.getElementById(style.senriu);
    let selectTheme = document.getElementById(style.selectTheme);
    let backPhase1 = document.getElementById(style.backPhase1);
    let nextView = document.getElementById(style.nextView);

    this.fadeIn(backPhase1);
    this.fadeIn(nextView);
    this.fadeIn(senriu);
    this.fadeIn(selectTheme);

    // fadeout
    let backPhase2 = document.getElementById(style.backPhase2);
    let submit =  document.getElementById(style.submit);

    this.fadeOut(backPhase2);
    this.fadeOut(submit);
  },

  onClickSubmit(e) {
    e.preventDefault();

    request
      .post('/api/senriu')
      .send({
        col1: this.state.col1,
        col2: this.state.col2,
        col3: this.state.col3,
        author: this.state.author,
        themeId: this.state.themeId
      })
      .end((err, res)=>{
        location.href = '/work/' + res.body.urlId;
      });
  },

  changeStyleNav1() {
    return style.nav1;
  },

  changeStyleNav2() {
    return style.nav2;
  },

  setValue(key, val) {
    this.setState({
      [key]: val
    });
  },

  render() {
    return(
      <div className={style.wrap}>
        <div id={style.phase1} className={style.phase1}>
          <div className={style.description}>
            <p>ようこそ、「せんりう」へ。</p>
            <p>まずはあなたの雅号（ニックネーム）を決めましょう。</p>
            <p>お題を選んで、心のままにあなたの川柳を詠んでみましょう。</p>
          </div>
          <h2 className={style.stepHeadline}>
            <span>一</span>雅号
          </h2>
          <div className={style.stepLine}>
            <Input id="author" number="10" onChange={this.setValue} active={true} />
          </div>
          <h2 className={style.stepHeadline}>
            <span>二</span>お題
          </h2>
          <div className={style.stepLine}>
            <Theme theme={this.state.theme} onChange={this.onChangeTheme} />
          </div>
          <h2 className={style.stepHeadline}>
            <span>三</span>詠む
          </h2>
          <div>
            <a href="#" className={style.btnRead} onClick={this.onClickNextPhase2}>一句詠む</a>
          </div>
        </div>
        <div id={style.phase2} className={style.phase2}>
          <h2 id={style.selectTheme} className={style.selectTheme}>
            <span>お題</span>「{this.state.themeTitle}」
          </h2>
          <div className={style.senriuWrap}>
            <div id={style.senriu} className={style.senriu}>
              <ol className={style.cols}>
                <li><Input id="col1" number="5" onChange={this.setValue} active={this.state.isSenriuActive} /></li>
                <li><Input id="col2" number="7" onChange={this.setValue} active={this.state.isSenriuActive} /></li>
                <li><Input id="col3" number="5" onChange={this.setValue} active={this.state.isSenriuActive} /></li>
              </ol>
              <p className={style.authorInitial}>{this.state.author.split('')[0]}</p>
            </div>
          </div>
          <ul id={style.nav1} className={style.nav1}>
            <li><a href="#" id={style.backPhase1} className={style.backPhase1} onClick={this.onClickBackPhase1}>詠むのをやめる</a></li>
            <li><a href="#" id={style.nextView} className={style.nextView} onClick={this.onClickNextView}>次へ</a></li>
          </ul>
          <ul id={style.nav2} className={style.nav2}>
            <li><a href="#" id={style.backPhase2} className={style.backPhase2} onClick={this.onClickBackPhase2}>詠み直す</a></li>
            <li><a href="#" id={style.submit} className={style.submit} onClick={this.onClickSubmit}>投稿する</a></li>
          </ul>
        </div>
      </div>
    )
  }
});
