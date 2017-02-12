import React from 'react';

import style from './Theme.css';

export default React.createClass({
  propTypes: {
    theme: React.PropTypes.array
  },

  getInitialState() {
    return {
      selected: '',
      isOpen: false
    };
  },

  onClickTheme(value) {
    this.setState({
      selected: value
    });

    this.props.onChange(value);
  },

  isActive(value) {
    return (value === this.state.selected) ? style.active : '';
  },

  onClickHeadline() {
    let contents = document.getElementById(style.contents);
    let list = document.querySelector('.' + style.list);

    if (this.state.isOpen) {
      contents.style.width = '0px';
      this.setState({
        isOpen: false
      });
    }
    else {
      contents.style.width = `${list.offsetWidth}px`;
      this.setState({
        isOpen: true
      });
    }
  },

  render() {
    return(
      <div>
        <a href="#" onClick={this.onClickHeadline}>テーマを選択する</a>
        <select>
          {this.props.theme.map((theme)=>{
            return (
              <option value={this.isActive(theme._id)} onClick={this.onClickTheme.bind(this, theme._id)}>{theme.title}</option>
            )
          })}
        </select>
        <div>
          <ol className={style.list}>
            {this.props.theme.map((theme)=>{
              return (
                <li className={this.isActive(theme._id)} onClick={this.onClickTheme.bind(this, theme._id)}>{theme.title}</li>
              )
            })}
          </ol>
        </div>
      </div>
    )
  }
});
