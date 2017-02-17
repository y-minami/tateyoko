import React from 'react';

import request from 'superagent';
import style from './Home.css';

import Theme from './Theme.jsx';
import Author from './Input.jsx';
import Col1 from './Input.jsx';
import Col2 from './Input.jsx';
import Col3 from './Input.jsx';

export default React.createClass({
  getInitialState() {
    return {
      theme: [],
      themeId: '',
      themeTitle: '',
      author: '',
      col1: '',
      col2: '',
      col3: ''
    };
  },

  componentDidMount() {
    this.props.onChange('fullscreen');
    
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

  onClickSubmit(e) {
    e.preventDefault();

    request
      .post('/api/senriu')
      .send({
        col1: document.getElementById('inputCol1').value,
        col2: document.getElementById('inputCol2').value,
        col3: document.getElementById('inputCol3').value,
        author: document.getElementById('inputAuthor').value,
        themeId: this.state.themeId
      })
      .end((err, res)=>{
      });
  },

  onClickNextPhase2() {
    // layoutのclass変更
    this.props.onChange('fullscreen');

    let phase1 = document.getElementById(style.phase1);
    let phase2 = document.getElementById(style.phase2);

    phase1.style.display = 'none';
    phase2.style.display = 'block';
  },

  onClickBackPhase1() {
    
  },

  onClickNextView() {
    
  },

  onClickBackPhase2() {
    
  },

  onClickSubmit() {
    
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
            <Author id="author" number="10" onChange={this.setValue} />
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
          <div className={style.senriu}>
            <ol className={style.cols}>
              <li><Col1 id="col1" number="5" onChange={this.setValue} /></li>
              <li><Col2 id="col2" number="7" onChange={this.setValue} /></li>
              <li><Col3 id="col3" number="5" onChange={this.setValue} /></li>
            </ol>
            <p className={style.authorInitial}>和</p>
          </div>
          <ul className={style.nav}>
            <li><a href="#" onClick={this.onClickBackPhase1}>詠むのをやめる</a></li>
            <li><a href="#" onClick={this.onClickNextView}>次へ</a></li>
          </ul>
          <ul className={style.nav2}>
            <li><a href="#" onClick={this.onClickBackPhase2}>詠み直す</a></li>
            <li><a href="#" onClick={this.onClickSubmit}>投稿する</a></li>
          </ul>
        </div>
      </div>
    )
  }
});
