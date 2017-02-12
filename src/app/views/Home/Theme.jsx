import React from 'react';

import style from './Theme.css';

export default React.createClass({
  propTypes: {
    theme: React.PropTypes.array
  },

  getInitialState() {
    return {
      selected: '',
      isOpenedModal: false
    };
  },

  onClickTheme(themeId, title) {
    this.setState({
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

    if (this.state.isOpenedModal) {
      modal.style.display = 'none';
    }
    else {
      modal.style.display = 'block';
    }

    this.setState({
      isOpenedModal: (!this.state.isOpenedModal)
    });
  },

  onClickOverlay(e) {
    let modal = document.getElementById(style.modal);

    if (e.target !== modal) return;

    modal.style.display = 'none';

    this.setState({
      isOpenedModal: false
    });
  },

  render() {
    return(
      <div>
        <a href="#" onClick={this.onClickButton}>お題を選択してください</a>
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
