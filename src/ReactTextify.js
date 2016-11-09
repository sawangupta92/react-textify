import MentionResults from './components/MentionResults'
import React, { Component } from 'react';
require('es6-promise').polyfill();
require('isomorphic-fetch');

class ReactTextify extends Component {
  constructor(props) {
    super()
    this.getMentions = this.getMentions.bind(this)
    this.sendAPIRequest = this.sendAPIRequest.bind(this)
    this.onMentionSelected = this.onMentionSelected.bind(this)
    this.state = {mentions: [], cursorLocation: 0, mentionKeyword: props.mentionKeyword || '@'}
  }

  sendAPIRequest(currentWord) {
    this.setState({ mentions: [] })
    if(currentWord[0]===this.state.mentionKeyword && currentWord.length>=(parseInt(this.props.minimumLength, 8) || 3)){
      var req = new Request(this.props.url + '?' + this.props.param + '=' + currentWord, {
        method: this.props.method || 'GET',
        headers: this.props.headers || []
      })

      fetch(req).then(response => response.json()).then(response => {
        if(this.props.mentionResultManipulation===undefined){
          return response
        } else {
          return this.props.mentionResultManipulation(response)
        }
      }).then(json_response => {
        this.setState({ mentions: json_response })
      })
    }
  }

  getMentions(e) {
    let _this=this;
    let currentWord = /\S+$/.exec(e.target.value.slice(0, e.target.selectionEnd))
    this.setState({cursorLocation: e.target.selectionEnd})
    if(currentWord!==null){
      return _this.sendAPIRequest(currentWord[0])
    }
  }

  onMentionSelected(e) {
    let inputValue = this.refs.mention_input.value;
    let elem = /\S+$/.exec(inputValue.slice(0, this.state.cursorLocation), e.target.textContent)
    this.refs.mention_input.value = inputValue.slice(0, elem.index) + this.state.mentionKeyword + e.target.textContent + inputValue.slice(elem.index + elem[0].length)
    this.setState({mentions: []})
  }

  render() {
    return <div>Hello
      <input onChange={this.getMentions} ref='mention_input' />
      <MentionResults mentions={this.state.mentions} onMentionSelected={this.onMentionSelected} mentionPrimaryKey={this.props.mentionPrimaryKey} mentionDisplayField={this.props.mentionDisplayField} />
    </div>
  }
}

export default ReactTextify;
