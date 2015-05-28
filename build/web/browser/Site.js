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
      if (!process.pid) {
        require('./site.less');
      }
      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          _reactBootstrap.Navbar,
          { brand: _react2['default'].createElement(
              _reactRouter.Link,
              { to: 'home' },
              'Exponent'
            ), toggleNavKey: '0' },
          _react2['default'].createElement(
            _reactBootstrap.CollapsibleNav,
            { eventKey: '0' },
            _react2['default'].createElement(
              _reactBootstrap.Nav,
              { navbar: true },
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
              { navbar: true, right: true },
              _react2['default'].createElement(
                _reactRouterBootstrap.NavItemLink,
                { to: 'home' },
                'Home'
              )
            )
          )
        ),
        _react2['default'].createElement(_reactRouter.RouteHandler, null),
        _react2['default'].createElement(Footer, null)
      );
    }
  }]);

  return Site;
})(_react2['default'].Component);

exports['default'] = Site;

var Footer = (function (_React$Component2) {
  function Footer() {
    _classCallCheck(this, Footer);

    if (_React$Component2 != null) {
      _React$Component2.apply(this, arguments);
    }
  }

  _inherits(Footer, _React$Component2);

  _createClass(Footer, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'footer',
        { className: 'bs-docs-footer' },
        _react2['default'].createElement(
          'div',
          { className: 'container' },
          _react2['default'].createElement(
            'div',
            { className: 'bs-docs-social' },
            _react2['default'].createElement(
              'ul',
              { className: 'bs-docs-social-buttons' },
              _react2['default'].createElement(
                'li',
                null,
                _react2['default'].createElement('iframe', {
                  className: 'social-iframe github-btn',
                  src: 'https://ghbtns.com/github-btn.html?user=exponentjs&type=follow&size=large',
                  scrolling: 'no',
                  style: { width: 196, height: 30 }
                })
              ),
              _react2['default'].createElement(
                'li',
                null,
                _react2['default'].createElement('iframe', {
                  className: 'social-iframe',
                  src: 'https://platform.twitter.com/widgets/follow_button.html?screen_name=exponentjs&show_count=false&show_screen_name=true&size=l',
                  scrolling: 'no',
                  style: { width: 161, height: 28 }
                })
              )
            )
          ),
          _react2['default'].createElement(
            'p',
            null,
            'Exponent is more delightful than projects that call themselves delightful and is made with more love than products that say they\'re made with love and is made in California more than your iPhone.'
          ),
          _react2['default'].createElement(
            'ul',
            { className: 'bs-docs-footer-links muted' },
            _react2['default'].createElement(
              'li',
              null,
              '·'
            ),
            _react2['default'].createElement(
              'li',
              null,
              _react2['default'].createElement(
                'a',
                { href: 'https://github.com/react-bootstrap/react-bootstrap/' },
                'GitHub'
              )
            ),
            _react2['default'].createElement(
              'li',
              null,
              '·'
            ),
            _react2['default'].createElement(
              'li',
              null,
              _react2['default'].createElement(
                'a',
                { href: 'https://github.com/react-bootstrap/react-bootstrap/issues?state=open' },
                'Issues'
              )
            ),
            _react2['default'].createElement(
              'li',
              null,
              '·'
            ),
            _react2['default'].createElement(
              'li',
              null,
              _react2['default'].createElement(
                'a',
                { href: 'https://github.com/react-bootstrap/react-bootstrap/releases' },
                'Releases'
              )
            )
          ),
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

  return Footer;
})(_react2['default'].Component);

module.exports = exports['default'];
//# sourceMappingURL=../../sourcemaps/web/browser/Site.js.map