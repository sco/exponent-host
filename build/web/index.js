'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var React = require('react');

var Home = (function (_React$Component) {
  function Home() {
    _classCallCheck(this, Home);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Home, _React$Component);

  _createClass(Home, [{
    key: 'render',
    value: function render() {
      require('./style.css');
      return React.createElement(
        'div',
        null,
        'hello'
      );
    }
  }]);

  return Home;
})(React.Component);

React.render(React.createElement(Home, null), document.getElementById('react'));

exports['default'] = Home;
module.exports = exports['default'];
//# sourceMappingURL=../sourcemaps/web/index.js.map