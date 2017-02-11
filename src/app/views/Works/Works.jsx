import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';

import style from './Works.css';

export default React.createClass({
  getInitialState(){
    return {
      senriu: []
    };
  },
  componentDidMount(){
    request
      .get('/api/senriu')
      .end((err, res)=>{
        if (err) {
          console.log(err);
          return;
        }

        this.setState({
          senriu: res.body
        });
      });
  },
  render(){
    return(
      <div className={style.wrap}>
        <h2>作品</h2>
        <ol className={style.senriu}>
          {this.state.senriu.map((work)=>{
            return (
              <li key={work.urlId}>
                <Link to={`/work/${work.urlId}`}>
                  <p>{work.author}</p>
                  <p>{work.col1}</p>
                </Link>
              </li>
            )
          })}
        </ol>
        <div className="detail">
          {this.props.children}
        </div>
      </div>
    )
  }
});
