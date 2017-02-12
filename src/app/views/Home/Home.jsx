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

  onClickNext() {
    // layoutのclass変更
    this.props.onChange('fullscreen');

    let phase1 = document.getElementById(style.phase1);
    let phase2 = document.getElementById(style.phase2);

    phase1.style.display = 'none';
    phase2.style.display = 'block';
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
          <div>
            <p>ようこそ、「せんりう」へ。</p>
            <p>まずはあなたの俳号（ニックネーム）を決めましょう。</p>
            <p>お題を選んで、心のままにあなたの川柳を詠んでみましょう。</p>
          </div>
          <div>
            <h2>俳号</h2>
            <Author id="author" number="10" onChange={this.setValue} />
          </div>
          <div>
            <h2>お題</h2>
            <Theme theme={this.state.theme} onChange={this.onChangeTheme} />
          </div>
          <a href="#" className={style.button} onClick={this.onClickNext}>一句詠む</a>
        </div>
        <div id={style.phase2} className={style.phase2}>
          <h2>お題「{this.state.themeTitle}」</h2>
          <ol className={style.cols}>
            <li><Col1 id="col1" number="5" onChange={this.setValue} /></li>
            <li><Col2 id="col2" number="7" onChange={this.setValue} /></li>
            <li><Col3 id="col3" number="5" onChange={this.setValue} /></li>
          </ol>
          <ul className={style.nav}>
            <li><a href="#">詠むのをやめる</a></li>
            <li><a href="#">次へ</a></li>
          </ul>
          <ul className={style.nav2}>
            <li><a href="#">詠み直す</a></li>
            <li><a href="#">投稿する</a></li>
          </ul>
        </div>
      </div>
    )
  }
});
