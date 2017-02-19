import React from 'react';
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

  onChangeTheme(themeId, themeTitle) {
    this.setState({
      themeId,
      themeTitle
    });
  },

  onClickNextPhase2() {
    // layoutのclass変更
    this.props.onChange('fullscreen');

    let phase1 = document.getElementById(style.phase1);
    let phase2 = document.getElementById(style.phase2);
    let nav1   = document.getElementById(style.nav1);
    let nav2   = document.getElementById(style.nav2);

    Velocity(phase1, {
      opacity: 0
    },{
      complete: ()=>{
        phase1.style.display = 'none';
      }
    });

    nav1.style.display = 'block';
    nav2.style.display = 'none';

    phase2.style.display = 'block';
    phase2.style.opacity = 0;

    Velocity(phase2, {
      opacity: 1
    });
  },

  onClickBackPhase1() {
    // layoutのclass変更
    this.props.onChange('default');

    let phase1 = document.getElementById(style.phase1);
    let phase2 = document.getElementById(style.phase2);

    Velocity(phase2, {
      opacity: 0
    },{
      complete: ()=>{
        phase2.style.display = 'none';
      }
    });

    phase1.style.display = 'block';
    phase1.style.opacity = 0;

    Velocity(phase1, {
      opacity: 1
    });


  },

  onClickNextView() {
    this.setState({
      isSenriuActive: false
    });
  },

  onClickBackPhase2() {
    
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
          <h2 className={style.selectTheme}>
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
            <li><a href="#" className={style.backPahse1} onClick={this.onClickBackPhase1}>詠むのをやめる</a></li>
            <li><a href="#" className={style.nextView} onClick={this.onClickNextView}>次へ</a></li>
          </ul>
          <ul id={style.nav2} className={style.nav2}>
            <li><a href="#" className={style.backPhase2} onClick={this.onClickBackPhase2}>詠み直す</a></li>
            <li><a href="#" className={style.submit} onClick={this.onClickSubmit}>投稿する</a></li>
          </ul>
        </div>
      </div>
    )
  }
});
