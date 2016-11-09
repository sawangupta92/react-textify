'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _componentsMentionResults = require('./components/MentionResults');

var _componentsMentionResults2 = _interopRequireDefault(_componentsMentionResults);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('es6-promise').polyfill();
require('isomorphic-fetch');

var ReactMentionTextify = (function (_Component) {
  _inherits(ReactMentionTextify, _Component);

  function ReactMentionTextify(props) {
    _classCallCheck(this, ReactMentionTextify);

    _get(Object.getPrototypeOf(ReactMentionTextify.prototype), 'constructor', this).call(this);
    this.getMentions = this.getMentions.bind(this);
    this.sendAPIRequest = this.sendAPIRequest.bind(this);
    this.onMentionSelected = this.onMentionSelected.bind(this);
    this.state = { mentions: [], cursorLocation: 0, mentionKeyword: props.mentionKeyword || '@' };
  }

  _createClass(ReactMentionTextify, [{
    key: 'sendAPIRequest',
    value: function sendAPIRequest(currentWord) {
      var _this2 = this;

      this.setState({ mentions: [] });
      if (currentWord[0] === this.state.mentionKeyword && currentWord.length >= (parseInt(this.props.minimumLength, 8) || 3)) {
        var req = new Request(this.props.url + '?' + this.props.param + '=' + currentWord, {
          method: this.props.method || 'GET',
          headers: this.props.headers || []
        });

        fetch(req).then(function (response) {
          return response.json();
        }).then(function (response) {
          if (_this2.props.mentionResultManipulation === undefined) {
            return response;
          } else {
            return _this2.props.mentionResultManipulation(response);
          }
        }).then(function (json_response) {
          _this2.setState({ mentions: json_response });
        });
      }
    }
  }, {
    key: 'getMentions',
    value: function getMentions(e) {
      var _this = this;
      var currentWord = /\S+$/.exec(e.target.value.slice(0, e.target.selectionEnd));
      this.setState({ cursorLocation: e.target.selectionEnd });
      if (currentWord !== null) {
        return _this.sendAPIRequest(currentWord[0]);
      }
    }
  }, {
    key: 'onMentionSelected',
    value: function onMentionSelected(e) {
      var inputValue = this.refs.mention_input.value;
      var elem = /\S+$/.exec(inputValue.slice(0, this.state.cursorLocation), e.target.textContent);
      this.refs.mention_input.value = inputValue.slice(0, elem.index) + this.state.mentionKeyword + e.target.textContent + inputValue.slice(elem.index + elem[0].length);
      this.setState({ mentions: [] });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement('input', { onChange: this.getMentions, className: this.props.inputClasses, ref: 'mention_input' }),
        _react2['default'].createElement(_componentsMentionResults2['default'], { mentions: this.state.mentions, onMentionSelected: this.onMentionSelected, mentionPrimaryKey: this.props.mentionPrimaryKey, mentionDisplayField: this.props.mentionDisplayField })
      );
    }
  }]);

  return ReactMentionTextify;
})(_react.Component);

exports['default'] = ReactMentionTextify;
module.exports = exports['default'];