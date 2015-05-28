'use strict';

<<<<<<< HEAD
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
=======
var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

require('babel/polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

// need to configure koa if we want to use real URL paths w/ history API
_reactRouter2['default'].run(_routes2['default'], _reactRouter2['default'].HistoryLocation, function (Root) {
  _react2['default'].render(_react2['default'].createElement(Root, null), document.getElementById('root'));
});
<<<<<<< HEAD:build/web/index.js
>>>>>>> [Web] Render the HTML on the server and ship it down
//# sourceMappingURL=../sourcemaps/web/index.js.map
=======
//# sourceMappingURL=../../sourcemaps/web/browser/index.js.map
>>>>>>> Use React component to render whole page on server, cleanup index.js:build/web/browser/index.js
