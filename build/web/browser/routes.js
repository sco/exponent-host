'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _About = require('./About');

var _About2 = _interopRequireDefault(_About);

var _Community = require('./Community');

var _Community2 = _interopRequireDefault(_Community);

var _Documentation = require('./Documentation');

var _Documentation2 = _interopRequireDefault(_Documentation);

var _GettingStarted = require('./GettingStarted');

var _GettingStarted2 = _interopRequireDefault(_GettingStarted);

var _Help = require('./Help');

var _Help2 = _interopRequireDefault(_Help);

var _Home = require('./Home');

var _Home2 = _interopRequireDefault(_Home);

var _NotFound = require('./NotFound');

var _NotFound2 = _interopRequireDefault(_NotFound);

var _PrivacyPolicy = require('./PrivacyPolicy');

var _PrivacyPolicy2 = _interopRequireDefault(_PrivacyPolicy);

var _Site = require('./Site');

var _Site2 = _interopRequireDefault(_Site);

var _TermsOfService = require('./TermsOfService');

var _TermsOfService2 = _interopRequireDefault(_TermsOfService);

exports['default'] = _react2['default'].createElement(
  _reactRouter.Route,
  { path: '/', handler: _Site2['default'] },
  _react2['default'].createElement(_reactRouter.Route, { name: 'home', path: '/', handler: _Home2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { name: 'about', handler: _About2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { name: 'community', handler: _Community2['default'] }),
  _react2['default'].createElement(
    _reactRouter.Route,
    { name: 'docs', handler: _Documentation2['default'] },
    _react2['default'].createElement(_reactRouter.DefaultRoute, { handler: _GettingStarted2['default'] })
  ),
  _react2['default'].createElement(_reactRouter.Route, { name: 'help', handler: _Help2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { name: 'privacy', handler: _PrivacyPolicy2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { name: 'terms', handler: _TermsOfService2['default'] }),
  _react2['default'].createElement(_reactRouter.NotFoundRoute, { handler: _NotFound2['default'] })
);
module.exports = exports['default'];
//# sourceMappingURL=../../sourcemaps/web/browser/routes.js.map