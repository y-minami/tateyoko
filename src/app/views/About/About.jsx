import React from 'react';

import style from './About.css';

export default React.createClass({
  componentDidMount() {
    this.props.changeNavActive('/about');
    this.props.changeLayout('default');
    this.props.changePageTitle('このサイトについて');
  },
  render(){
    return(
      <div className={style.wrap}>
        <h3 className={style.headline}>
          <span>一</span>このサイトについて
        </h3>
        <div className={style.content}>
          <p>当サイトは<a href="http://tategaki.github.io/awards/" target="_blank">たてよこWebアワード</a>のために作成されたサイトです。</p>
          <p>当サイトのソースコード、デザインの著作権は制作者に帰属します。</p>
          <p>投稿された川柳の著作権は作者に帰属します。</p>
        </div>
        <h3 className={style.headline}>
          <span>二</span>作者について
        </h3>
        <div className={style.creatorContent}>
          <div className={style.creator}>
            <h3>フロントエンドエンジニア</h3>
            <p>kazuhiro kobayashi</p>
            <p><a href="http://blog.kzhrk.com/" className={style.underline} target="_blank">blog.kzhrk.com</a></p>
          </div>
          <div className={style.creator}>
            <h3>デザイナー</h3>
            <p>takehito goto</p>
            <p><a href="http://takehitogoto.com/" className={style.underline} target="_blank">takehitogoto.com</a></p>
          </div>
        </div>
        <h3 className={style.headline}>
          <span>三</span>お問い合わせ
        </h3>
        <div className={style.content}>
          <p><a href="mailto:kzhrk0430+senriu@gmail.com" className={style.underline}>kzhrk0430+senriu@gmail.com</a></p>
        </div>
      </div>
    )
  }
});
