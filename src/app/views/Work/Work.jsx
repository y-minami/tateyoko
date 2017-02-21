import React from 'react';
import request from 'superagent';

import style from './Work.css';

import Theme from './Theme.jsx';
import ThemeSenriu from './ThemeSenriu.jsx';

export default React.createClass({
  getInitialState(){
    return {
      col1: '',
      col2: '',
      col3: '',
      author: '',
      themeId: ''
    };
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.params.urlId === nextProps.params.urlId) return;

    this.props.params.urlId = nextProps.params.urlId;

    this.update();
  },

  componentDidMount(){
    this.update();
  },

  update() {
    if (typeof this.props.params.urlId === 'undefined') {
      request
        .get('/api/latestSenriu')
        .end((err, res)=>{
          if (err) {
            console.log(err);
            return;
          }

          this.setState({
            col1: res.body.col1,
            col2: res.body.col2,
            col3: res.body.col3,
            author: res.body.author,
            themeId: res.body.themeId
          });
        });
    }
    else {
      request
        .get('/api/senriu/' + this.props.params.urlId)
        .end((err, res)=>{
          if (err) {
            console.log(err);
            return;
          }

          this.setState({
            col1: res.body.col1,
            col2: res.body.col2,
            col3: res.body.col3,
            author: res.body.author,
            themeId: res.body.themeId
          });
        });
    }
  },

  getSpanString(string) {
    return string.split('').map((str)=>{
      return (<span>{str}</span>);
    });
  },

  onChangeTheme(themeId) {
    this.setState({
      themeId
    });
  },

  render() {
    return(
      <div className={style.wrap}>
        <h2 className={style.author}>「{this.state.author}」<span>作</span></h2>
        <div className={style.senriuWrap}>
          <div id={style.senriu} className={style.senriu}>
            <ol className={style.cols}>
              <li>{this.getSpanString(this.state.col1)}</li>
              <li>{this.getSpanString(this.state.col2)}</li>
              <li>{this.getSpanString(this.state.col3)}</li>
            </ol>
            <p className={style.authorInitial}>{this.state.author.split('')[0]}</p>
          </div>
        </div>
        <div className={style.themeSenriuWrap}>
          <Theme themeId={this.state.themeId} onChange={this.onChangeTheme} />
          <ThemeSenriu themeId={this.state.themeId} />
        </div>
      </div>
    )
  }
});
