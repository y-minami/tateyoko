import React from 'react';

import style from './NoMatch.css';

export default React.createClass({
  render(){
    return(
      <div className={style.wrap}>
        <h2>404</h2>
        <p>ダミーテキストです</p>
      </div>
    )
  }
});
