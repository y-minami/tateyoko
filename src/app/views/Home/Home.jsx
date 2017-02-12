import React from 'react';

import request from 'superagent';
import style from './Home.css';

import Theme from './Theme.jsx';
import Input from './Input.jsx';

const renderCaret = (inputElement, renderElement, caretNum)=>{
  let input = inputElement;
  let col = renderElement;
  let colVal = input.value;
  let str1 = document.createTextNode(colVal.slice(0, caretNum));
  let str2 = document.createTextNode(colVal.slice(caretNum, colVal.length));
  let caret = document.createElement('SPAN');

  col.innerHTML = '';
  col.appendChild(str1);
  col.appendChild(caret);
  col.appendChild(str2);
};

export default React.createClass({
  getInitialState() {
    return {
      theme: [],
      themeId: '',
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

  onInputCol(e) {
    renderCaret(
      e.target,
      document.getElementById(e.target.dataset.target),
      e.target.selectionStart
    );
  },

  onKeyDownCol(e) {
    let caretNum;

    switch (e.keyCode) {
      // left
      case 37:
        caretNum = Math.max(0, (e.target.selectionStart - 1));
        break;
      // right
      case 39:
        caretNum = Math.min(e.target.value.length, (e.target.selectionStart + 1));
        break;
      // top
      case 38:
        caretNum = 0;
        break;
      // down
      case 40:
        caretNum = e.target.value.length;
        break;
      default:
        return;
        break;
    }

    renderCaret(
      e.target,
      document.getElementById(e.target.dataset.target),
      caretNum
    );
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

  onClickCol(e) {
    document.getElementById(e.currentTarget.dataset.target).focus();
  },

  onBlurCol(e) {
    let col = document.getElementById(e.target.dataset.target);
    let text = col.textContent;

    col.textContent = text;
  },

  onFocusCol(e) {
    let col = document.getElementById(e.target.dataset.target);
    let caret = document.createElement('SPAN');

    col.appendChild(caret);
  },

  onChangeTheme(themeId) {
    this.setState({
      themeId
    });
  },

  onClickNext() {
    this.props.onChange('fullscreen');
  },

  render() {
    return(
      <div className={style.wrap}>
        <div className={style.phase1}>
          <div>
            <p>ようこそ、「せんりう」へ。</p>
            <p>まずはあなたの俳号（ニックネーム）を決めましょう。</p>
            <p>お題を選んで、心のままにあなたの川柳を詠んでみましょう。</p>
          </div>
          <div>
            <h2>俳号</h2>
            <Input number="10" />
          </div>
          <div>
            <h2>お題</h2>
            <Theme theme={this.state.theme} onChange={this.onChangeTheme} />
          </div>
          <a href="#" className={style.button} onClick={this.onClickNext}>一句詠む</a>
        </div>
        <div className={style.phase2}>
          <h2>お題「デザイナーあるある」</h2>
          <div>
            <div><p></p><input /></div>
            <div><p></p><input /></div>
            <div><p></p><input /></div>
          </div>
          <ol className={style.cols}>
            <li id="col1" data-target="inputCol1" onClick={this.onClickCol}></li>
            <li id="col2" data-target="inputCol2" onClick={this.onClickCol}></li>
            <li id="col3" data-target="inputCol3" onClick={this.onClickCol}></li>
          </ol>
          <input id="inputCol1" data-target="col1" type="text" onInput={this.onInputCol} onKeyDown={this.onKeyDownCol} onBlur={this.onBlurCol} onFocus={this.onFocusCol} />
          <input id="inputCol2" data-target="col2" type="text" onInput={this.onInputCol} onKeyDown={this.onKeyDownCol} onBlur={this.onBlurCol} onFocus={this.onFocusCol} />
          <input id="inputCol3" data-target="col3" type="text" onInput={this.onInputCol} onKeyDown={this.onKeyDownCol} onBlur={this.onBlurCol} onFocus={this.onFocusCol} />
          <a href="#">次へ</a>
        </div>
      </div>
    )
  }
});
