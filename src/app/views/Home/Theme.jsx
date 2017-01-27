import React from 'react';

import style from './Theme.css';

export default React.createClass({
  propTypes: {
    theme: React.PropTypes.array
  },

  getInitialState() {
    return {
      selected: ''
    };
  },

  onClickTheme(value) {
    this.setState({
      selected: value
    });

    this.props.onChange(value);
  },

  isActive(value) {
    return (value === this.state.selected) ? style.active : '';
  },

  render() {
    return(
      <ol>
        {this.props.theme.map((theme)=>{
          return (
            <li className={this.isActive(theme._id)} onClick={this.onClickTheme.bind(this, theme._id)}>{theme.title}</li>
          )
        })}
      </ol>
    )
  }
});
