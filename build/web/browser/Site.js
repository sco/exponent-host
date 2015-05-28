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

var Site = (function (_React$Component) {
  function Site() {
    _classCallCheck(this, Site);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Site, _React$Component);

  _createClass(Site, [{
    key: 'render',
    value: function render() {
      //require('./site.css');
      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          _reactBootstrap.Navbar,
          { brand: _react2['default'].createElement(
              _reactRouter.Link,
              { to: 'home' },
              'Exponent'
            ) },
          _react2['default'].createElement(
            _reactBootstrap.Nav,
            null,
            _react2['default'].createElement(
              _reactRouterBootstrap.NavItemLink,
              { to: 'home' },
              'Home'
            ),
            _react2['default'].createElement(
              _reactRouterBootstrap.NavItemLink,
              { to: 'docs' },
              'Docs'
            ),
            _react2['default'].createElement(
              _reactRouterBootstrap.NavItemLink,
              { to: 'community' },
              'Community'
            ),
            _react2['default'].createElement(
              _reactRouterBootstrap.NavItemLink,
              { to: 'help' },
              'Help'
            )
          ),
          _react2['default'].createElement(
            _reactBootstrap.Nav,
            { className: 'nav-right' },
            _react2['default'].createElement(
              _reactRouterBootstrap.NavItemLink,
              { to: 'home' },
              'Home'
            )
          )
        ),
        _react2['default'].createElement(_reactRouter.RouteHandler, null),
        _react2['default'].createElement(
          'footer',
          null,
          'Slack / Twitter / FB / CLI github / API github',
          _react2['default'].createElement(
            _reactRouter.Link,
            { to: 'privacy' },
            'Privacy Policy'
          ),
          _react2['default'].createElement(
            _reactRouter.Link,
            { to: 'terms' },
            'Terms of Service'
          )
        )
      );
    }
  }]);

  return Site;
})(_react2['default'].Component);

exports['default'] = Site;
module.exports = exports['default'];
//# sourceMappingURL=../../sourcemaps/web/browser/Site.js.map