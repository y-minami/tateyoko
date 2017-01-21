import React from 'react';

import style from './About.css';

export default React.createClass({
  render(){
    return(
      <div className={style.wrap}>
        <h2>このサイトについて</h2>
        <p>ダミーテキストです</p>
      </div>
    )
  }
});
