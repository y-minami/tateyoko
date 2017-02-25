import React from 'react';
import request from 'superagent';
import Velocity from 'velocity-animate';

import style from './Work.css';

import Theme from './Theme.jsx';
import ThemeSenriu from './ThemeSenriu.jsx';

export default React.createClass({
  getInitialState(){
    return {
      urlId: '',
      col1: '',
      col2: '',
      col3: '',
      author: '',
      themeId: '',
      theme: [],
      themeTitle: ''
    };
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.params.urlId === nextProps.params.urlId) return;

    this.props.params.urlId = nextProps.params.urlId;

    this.update();
  },

  componentDidMount(){
    this.props.changeNavActive('/work');
    this.props.changePageTitle('川柳一覧');
    this.props.changeLayout('wrapWork');

    this.update();
  },

  update() {
    let setState = (err, res)=>{
      if (err) {
        console.log(err);
        return;
      }

      this.setState({
        col1: res.body.col1,
        col2: res.body.col2,
        col3: res.body.col3,
        author: res.body.author,
        themeId: res.body.themeId,
        urlId: res.body.urlId
      });

      request
        .get(`/api/theme/${res.body.themeId}`)
        .end((err, res)=>{
          if (err) {
            console.log(err);
            return;
          }

          this.setState({
            themeTitle: res.body.title
          })
        });
    };

    if (typeof this.props.params.urlId === 'undefined') {
      request
        .get('/api/latestSenriu')
        .end(setState);
    }
    else {
      request
        .get('/api/senriu/' + this.props.params.urlId)
        .end(setState);
    }

    request
      .get('/api/theme')
      .end((err, res)=>{
        if (err) {
          console.log(err);
          return;
        }

        this.setState({
          theme: res.body
        });
      });
  },

  getSpanString(string) {
    return string.split('').map((str)=>{

      return (<span>{str}</span>);
    });
  },

  onChangeTheme(themeId, themeTitle) {
    this.setState({
      themeId,
      themeTitle
    });
  },

  onClickFacebook(e) {
    e.preventDefault();

    window.open(`http://www.facebook.com/share.php?u=http%3A%2F%2Fsenriu.com%2Fwork%2F${this.state.urlId}`,
                'facebookwindow', 'width=650, height=470, menubar=0, toolbar=0, scrollbars=1');
  },

  onClickTwitter(e) {
    e.preventDefault();

    window.open(`https://twitter.com/share?
url=http%3A%2F%2Fsenriu.com%2Fwork%2F${this.state.urlId}&amp;
via=senriu_com&amp;
hashtags=たてよこWebアワード&amp;
text=${this.state.author} 「${this.state.col1} ${this.state.col2} ${this.state.col3}」`, 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1');
  },

  render() {
    return(
      <div className={style.wrap}>
        <h3 className={style.author}>「{this.state.author}」<span>作</span></h3>
        <div className={style.senriuWrap}>
          <div id={style.senriu} className={style.senriu}>
            <ol className={style.cols}>
              <li>{this.getSpanString(this.state.col1)}</li>
              <li>{this.getSpanString(this.state.col2)}</li>
              <li>{this.getSpanString(this.state.col3)}</li>
            </ol>
            <p className={style.authorInitial}>{this.state.author.split('')[0]}</p>
            <a href="#" onClick={this.onClickFacebook} className={style.facebook}><img src="/assets/facebook.svg" alt="Facebook" /></a>
            <a href="#" onClick={this.onClickTwitter} className={style.twitter}><img src="/assets/twitter.svg" alt="Tweet" /></a>
          </div>
        </div>
        <div className={style.themeSenriuWrap}>
          <Theme theme={this.state.theme} themeId={this.state.themeId} themeTitle={this.state.themeTitle} onChangeTheme={this.onChangeTheme} />
          <ThemeSenriu themeId={this.state.themeId} selected={this.state.urlId} />
        </div>
      </div>
    )
  }
});
