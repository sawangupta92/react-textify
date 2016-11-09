import React, { Component } from 'react';
var ReactDOM = require('react-dom');

class MentionResults extends Component {

  render() {
    return (
      <div>
        <ul>
          {this.props.mentions && this.props.mentions.map((mention) => {
            return <li key={mention[this.props.mentionPrimaryKey]} onClick={(e) => {this.props.onMentionSelected(e)}}>
              {mention[this.props.mentionDisplayField]}
            </li>
          }) }
        </ul>
      </div>
    );
  }
}

export default MentionResults;
