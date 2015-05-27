'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

require('babel/polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function renderPageAsync(url) {
  return new _Promise(function (resolve, reject) {
    _reactRouter2['default'].run(_routes2['default'], url, function (Root) {
      var markup = _react2['default'].renderToString(_react2['default'].createElement(Root, null));
      resolve(markup);
    });
  });
}

exports.renderPageAsync = renderPageAsync;
//# sourceMappingURL=../sourcemaps/web/ServerSideRendering.js.map