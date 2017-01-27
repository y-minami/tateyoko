import React from 'react';
import request from 'superagent';

import style from './Work.css';

export default React.createClass({
  getInitialState(){
    return {
      senriu: ''
    };
  },

  componentDidMount(){
    request
      .get('/api/senriu/' + this.props.params.urlId)
      .end((err, res)=>{
        if (err) {
          console.log(err);
          return;
        }

        console.log(res.body)

        this.setState({
          senriu: res.body
        });
      });
  },

  render() {
    return(
      <div className={style.wrap}>
        <h2>{this.state.senriu.author}</h2>
        <ol>
          <li>{this.state.senriu.col1}</li>
          <li>{this.state.senriu.col2}</li>
          <li>{this.state.senriu.col3}</li>
        </ol>
      </div>
    )
  }
});
