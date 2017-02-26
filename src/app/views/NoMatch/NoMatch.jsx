import React from 'react';

import style from './NoMatch.css';

export default React.createClass({
  componentDidMount() {
    this.props.changeNavActive('/404');
    this.props.changeLayout('default');
    this.props.changePageTitle('四〇四');
  },

  render(){
    return(
      <div className={style.wrap}>
        <h2>四〇四</h2>
        <p>ページが見つかりませんでした。</p>
      </div>
    )
  }
});
