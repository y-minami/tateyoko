import React from 'react';

import style from './Input.css';


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
  propTypes: {
    number: React.PropTypes.number
  },

  getInitialState() {
    return {
      value: ''
    };
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

  render() {
    let stringSpaces = [];
    for (let i = 0; i < this.props.number; i++) {
        stringSpaces.push(<span></span>);
    }

    return(
      <div className={style.col}>
        <p onClick={this.onClickCol}>
          {stringSpaces}
        </p>
        <input type="text" onInput={this.onInputCol} onKeyDown={this.onKeyDownCol} onBlur={this.onBlurCol} onFocus={this.onFocusCol} />
      </div>
    )
  }
});
