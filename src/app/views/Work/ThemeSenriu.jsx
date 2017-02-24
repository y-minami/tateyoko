import React from 'react';
import request from 'superagent';

import {Link} from 'react-router';

import style from './ThemeSenriu.css';

export default React.createClass({
  propTypes: {
    selected: React.PropTypes.string,
    themeId: React.PropTypes.string
  },

  getInitialState(){
    return {
      themeSenriu: [],
      selected: ''
    }
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.themeId === nextProps.themeId) return;

    request
      .get(`/api/senriu?themeId=${nextProps.themeId}`)
      .end((err, res)=>{
        if (err) {
          console.log(err);
          return;
        }

        this.setState({
          themeSenriu: res.body
        });
      });
  },

  changeSenriuState(urlId) {
    return (this.props.selected === urlId) ? `${style.senriu} ${style.senriuActive}` : style.senriu;
  },

  render() {
    return(
      <div className={style.wrap}>
        {this.state.themeSenriu.map((senriu)=>{
          return (
            <div className={this.changeSenriuState(senriu.urlId)}>
              <Link to={`/work/${senriu.urlId}`}>
                <ol className={style.cols}>
                  <li>{senriu.col1}</li>
                  <li>{senriu.col2}</li>
                  <li>{senriu.col3}</li>
                </ol>
              </Link>
            </div>
          )
        })}
      </div>
    )
  }
});
