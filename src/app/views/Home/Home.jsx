import React from 'react';

import request from 'superagent';
import style from './Home.css';

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

export default class Home extends React.Component {
  onInputCol(e) {
    renderCaret(
      e.target,
      document.getElementById(e.target.dataset.target),
      e.target.selectionStart
    );
  }

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
  }

  onClickSubmit(e) {
    request
      .post('/api/senriu')
      .send({
        col1: document.getElementById('inputCol1').value,
        col2: document.getElementById('inputCol2').value,
        col3: document.getElementById('inputCol3').value,
        author: document.getElementById('inputAuthor').value,
      })
      .end((err, res)=>{
      });
  }

  onClickCol(e) {
    document.getElementById(e.target.dataset.target).focus();
  }

  onBlurCol(e) {
    let col = document.getElementById(e.target.dataset.target);
    let text = col.textContent;

    col.textContent = text;
  }

  onFocusCol(e) {
    let col = document.getElementById(e.target.dataset.target);
    let caret = document.createElement('SPAN');

    col.appendChild(caret);
  }

  render(){
    return(
      <div className={style.wrap}>
        <ol>
          <li id="col1" data-target="inputCol1" onClick={this.onClickCol}></li>
          <li id="col2" data-target="inputCol2" onClick={this.onClickCol}></li>
          <li id="col3" data-target="inputCol3" onClick={this.onClickCol}></li>
          <li id="author" data-target="inputAuthor" onClick={this.onClickCol}></li>
        </ol>
        <input id="inputCol1" data-target="col1" type="text" onInput={this.onInputCol} onKeyDown={this.onKeyDownCol} onBlur={this.onBlurCol} onFocus={this.onFocusCol} />
        <input id="inputCol2" data-target="col2" type="text" onInput={this.onInputCol} onKeyDown={this.onKeyDownCol} onBlur={this.onBlurCol} onFocus={this.onFocusCol} />
        <input id="inputCol3" data-target="col3" type="text" onInput={this.onInputCol} onKeyDown={this.onKeyDownCol} onBlur={this.onBlurCol} onFocus={this.onFocusCol} />
        <input id="inputAuthor" data-target="author" type="text" onInput={this.onInputCol} onKeyDown={this.onKeyDownCol} onBlur={this.onBlurCol} onFocus={this.onFocusCol} />
        <a href="#" onClick={this.onClickSubmit}>投稿する</a>
      </div>
    )
  }
}
