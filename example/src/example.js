var React = require('react');
var ReactDOM = require('react-dom');
import ReactTextify from 'react-textify'

var App = React.createClass({

  mentionResultManipulation(response) {
    return response.payload
  },

	render () {
		return (
			<div>
        < ReactTextify url='http://localhost:3000/api/v1/wineries/1/customers/profile' param='name' mentionKeyword='#' minimumLength='5' mentionPrimaryKey='id' mentionDisplayField='first_name' mentionResultManipulation={this.mentionResultManipulation}/>
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
