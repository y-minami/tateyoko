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

        this.setState({
          senriu: res.body
        });

        this.setState({
          senriu: {
            col1: this.getSpanString(this.state.senriu.col1),
            col2: this.getSpanString(this.state.senriu.col2),
            col3: this.getSpanString(this.state.senriu.col3)
          }
        });
      });
  },

  getSpanString(string) {
    console.log(string)
    return string.split('').map((str)=>{
      return (<span>{str}</span>);
    });
  },

  render() {
    return(
      <div className={style.wrap}>
        <h2>「{this.state.senriu.author}」 作</h2>
        <div className={style.senriuWrap}>
          <div id={style.senriu} className={style.senriu}>
            <ol className={style.cols}>
              <li>{this.state.senriu.col1}</li>
              <li>{this.state.senriu.col2}</li>
              <li>{this.state.senriu.col3}</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }
});
