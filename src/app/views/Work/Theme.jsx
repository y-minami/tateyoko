import React from 'react';
import Velocity from 'velocity-animate';
import request from 'superagent';
import find from 'lodash.find';

import style from './Theme.css';


export default React.createClass({
  propTypes: {
    themeId: React.PropTypes.string
  },

  getInitialState() {
    return {
      theme: [],
      themeText: 'お題を選択してください',
      selected: '',
      isOpenedModal: false
    };
  },

  componentDidMount(){
    this.setState({
      themeId: this.props.themeId
    });

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

  componentWillReceiveProps(nextProps) {
    let initTheme = find(this.state.theme, {_id: nextProps.themeId});

    this.setState({
      themeText: initTheme.title,
      selected: initTheme._id
    });
  },

  onClickTheme(themeId, title) {
    this.setState({
      themeText: title,
      selected: themeId
    });

    // Homeに伝達
    this.props.onChange(themeId);
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
        <h3 className={style.headline}>お題<a className={style.button} href="#" onClick={this.onClickButton}>{this.state.themeText}</a>で詠まれた川柳</h3>
        <div id={style.modal} className={style.modal} onClick={this.onClickOverlay}>
          <ol className={style.list}>
            {this.state.theme.map((theme)=>{
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
