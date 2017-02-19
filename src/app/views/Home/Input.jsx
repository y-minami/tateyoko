import React from 'react';

import style from './Input.css';

const Column = React.createClass({
  propTypes: {
    number: React.PropTypes.number,
    value: React.PropTypes.string,
    current: React.PropTypes.number
  },

  stringSpaces() {
    let values = this.props.value.split('');
    let result = [];

    for (let i = 0; i < this.props.number; i++) {
      if (i === this.props.current) {
        result.push(<span className={style.current}>{values[i]}</span>);
      }
      else {
        result.push(<span>{values[i]}</span>);
      }
    }

    return (result);
  },

  render () {
    return (
      <p>
        {this.stringSpaces()}
      </p>
    )
  }
});

export default React.createClass({
  propTypes: {
    number: React.PropTypes.number,
    active: React.PropTypes.bool,
    isNull: React.PropTypes.bool
  },

  getInitialState() {
    return {
      value: '',
      current: -1
    };
  },

  onClickCol() {
    if (this.props.active === false) return;

    this.hiddenInput.focus();
  },

  onInputCol(e) {

    this.setState({
      current: Math.max(0, e.target.selectionStart),
      value: this.hiddenInput.value
    });
  },

  onKeyUpCol(e) {
    // move caret
    this.hiddenInput.setSelectionRange(this.state.current, this.state.current);

    // Homeに伝達
    this.props.onChange(this.props.id, this.state.value);
  },

  onKeyDownCol(e) {
    let caretNum;

    if (e.shiftKey) return;

    switch (e.keyCode) {
      // left
      case 37:
        // caretNum = Math.max(0, (e.target.selectionStart - 1));
        return;
        break;
      // right
      case 39:
        // caretNum = Math.min(e.target.value.length, (e.target.selectionStart + 1));
        return;
        break;
      // top
      case 38:
        caretNum = Math.max(0, (this.state.current - 1));
        break;
      // down
      case 40:
        caretNum = Math.min(e.target.value.length, (this.state.current + 1));
        break;
      default:
        return;
        break;
    }

    this.setState({
      value: this.hiddenInput.value,
      current: caretNum
    });
  },

  onBlurCol(e) {
    this.setState({
      current: -1
    });
  },

  onFocusCol(e) {
    this.setState({
      current: this.state.value.length
    });
  },

  changeClass() {
    return (this.props.active) ? style.col : `${style.col} ${style.off}`;
  },

  render() {
    return(
      <div className={this.changeClass()}>
        <div onClick={this.onClickCol}>
          <Column number={this.props.number} value={this.state.value} current={this.state.current} />
        </div>
        <input type="text" ref={(input)=>{this.hiddenInput=input;}} onInput={this.onInputCol} onKeyDown={this.onKeyDownCol} onKeyUp={this.onKeyUpCol} onBlur={this.onBlurCol} onFocus={this.onFocusCol} />
      </div>
    )
  }
});
