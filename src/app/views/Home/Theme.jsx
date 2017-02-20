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
      selected: '',
      isOpenedModal: false
    };
  },

  onClickTheme(themeId, title) {
    this.setState({
      themeText: title,
      selected: themeId
    });

    // Homeに伝達
    this.props.onChange(themeId, title);
  },

  isActive(value) {
    return (value === this.state.selected) ? style.active : '';
  },

  onClickButton(e) {
    let modal = document.getElementById(style.modal);

    modal.style.display = 'block';
    modal.style.opacity = 0;

    Velocity(modal, {
      opacity: 1
    },{
      complete: ()=>{
        this.setState({
          isOpenedModal: (!this.state.isOpenedModal)
        });
      }
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

        this.setState({
          isOpenedModal: false
        });
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
