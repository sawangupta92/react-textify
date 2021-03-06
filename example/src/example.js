var React = require('react');
var ReactDOM = require('react-dom');
import ReactMentionTextify from 'react-textify'

var App = React.createClass({

  mentionResultManipulation(response) {
    return response.payload
  },

	render () {
		return (
			<div>
        < ReactMentionTextify url='http://localhost:3000/api/v1/wineries/1/customers/profile' param='name' mentionKeyword='#' minimumLength='3' mentionPrimaryKey='id' mentionDisplayField='first_name' mentionResultManipulation={this.mentionResultManipulation} inputClasses='col-md-6' />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
