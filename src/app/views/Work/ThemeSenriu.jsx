import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  propTypes: {
    themeSenriu: React.PropTypes.array
  },

  getInitialState(){
    return {
      selected: ''
    }
  },

  render() {
    return(
      <div>
        {this.props.themeSenriu.map((senriu)=>{
          return (
            <div>
              <Link to={`/work/${senriu.urlId}`}>
                <ul>
                  <li>{senriu.col1}</li>
                  <li>{senriu.col2}</li>
                  <li>{senriu.col3}</li>
                </ul>
              </Link>
            </div>
          )
        })}
      </div>
    )
  }
});
