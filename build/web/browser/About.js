'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _reactRouter = require('react-router');

var _reactRouterBootstrap = require('react-router-bootstrap');

var About = (function (_React$Component) {
  function About() {
    _classCallCheck(this, About);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(About, _React$Component);

  _createClass(About, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'h1',
          null,
          'ABOUT'
        ),
        'about exponent'
      );
    }
  }]);

  return About;
})(_react2['default'].Component);

exports['default'] = About;
module.exports = exports['default'];
//# sourceMappingURL=../../sourcemaps/web/browser/About.js.map