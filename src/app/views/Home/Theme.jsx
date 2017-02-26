import React from 'react';
import Velocity from 'velocity-animate';

import style from './Theme.css';

export default React.createClass({
  propTypes: {
    theme: React.PropTypes.array
  },

  getInitialState() {
    return {
      themeText: 'お題を選択してください',
      selected: ''
    };
  },

  onClickTheme(themeId, title) {
    this.setState({
      themeText: title,
      selected: themeId
    });

    // Homeに伝達
    this.props.onChange(themeId, title);

    let modal = document.getElementById(style.modal);

    Velocity(modal, {
      opacity: 0
    },{
      complete: ()=>{
        modal.style.display = 'none';
      }
    });
  },

  isActive(value) {
    return (value === this.state.selected) ? style.active : '';
  },

  onClickButton(e) {
    e.preventDefault();

    let modal = document.getElementById(style.modal);

    modal.style.display = 'block';
    modal.style.opacity = 0;

    Velocity(modal, {
      opacity: 1
    });
  },

  onClickOverlay(e) {
    let modal = document.getElementById(style.modal);

    if (e.target !== modal) return;

    Velocity(modal, {
      opacity: 0
    },{
      complete: ()=>{
        modal.style.display = 'none';
      }
    });
  },

  render() {
    return(
      <div>
        <a className={style.button} href="#" onClick={this.onClickButton}>{this.state.themeText}</a>
        <div id={style.modal} className={style.modal} onClick={this.onClickOverlay}>
          <ol className={style.list}>
            {this.props.theme.map((theme)=>{
              return (
                <li className={this.isActive(theme._id)} onClick={this.onClickTheme.bind(this, theme._id, theme.title)}>{theme.title}</li>
              )
            })}
          </ol>
        </div>
      </div>
    )
  }
});
