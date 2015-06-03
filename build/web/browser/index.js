'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

require('babel/polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

_reactRouter2['default'].run(_routes2['default'], _reactRouter2['default'].HistoryLocation, function (Root) {
  _react2['default'].render(_react2['default'].createElement(Root, null), document.getElementById('root'));
});
//# sourceMappingURL=../../sourcemaps/web/browser/index.js.map