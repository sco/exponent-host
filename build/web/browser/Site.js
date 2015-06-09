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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./Site.less');

require('./Footer.less');

var Site = _react2['default'].createClass({
  displayName: 'Site',

  mixins: [_reactRouter.State],

  render: function render() {
    var rootClassNames = (0, _classnames2['default'])('site', {
      homeSite: this.isActive('home') });
    return _react2['default'].createElement(
      'div',
      { className: rootClassNames },
      _react2['default'].createElement(
        _reactBootstrap.Navbar,
        { brand: this._renderBrandLink(), toggleNavKey: '0' },
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
              'Get Started'
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
          )
        )
      ),
      _react2['default'].createElement(
        'div',
        { className: 'siteContent' },
        _react2['default'].createElement(_reactRouter.RouteHandler, null)
      ),
      _react2['default'].createElement(Footer, null)
    );
  },

  _renderBrandLink: function _renderBrandLink() {
    return _react2['default'].createElement(
      _reactRouter.Link,
      { to: 'home', className: 'logoType navLogoType' },
      _react2['default'].createElement('img', {
        src: require('../images/exponent-nav-bare@3x.png'),
        alt: 'Exponent'
      }),
      'Exponent'
    );
  } });

exports['default'] = Site;

var Footer = (function (_React$Component) {
  function Footer() {
    _classCallCheck(this, Footer);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Footer, _React$Component);

  _createClass(Footer, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'footer',
        { className: 'siteFooter container' },
        this._renderSocialButtons(),
        _react2['default'].createElement(
          'ul',
          { className: 'footerLinks' },
          _react2['default'].createElement(
            'li',
            null,
            _react2['default'].createElement(
              _reactRouter.Link,
              { to: 'help' },
              'Help'
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
              _reactRouter.Link,
              { to: 'privacy' },
              'Privacy Policy'
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
              _reactRouter.Link,
              { to: 'terms' },
              'Terms of Service'
            )
          )
        ),
        _react2['default'].createElement(
          'p',
          { className: 'footerTechnologies' },
          'This site was built with ',
          _react2['default'].createElement(
            'a',
            { href: 'https://iojs.org', target: '_blank' },
            'io.js'
          ),
          ', ',
          _react2['default'].createElement(
            'a',
            { href: 'http://koajs.com/', target: '_blank' },
            'koa'
          ),
          ', ',
          _react2['default'].createElement(
            'a',
            { href: 'https://webpack.github.io/', target: '_blank' },
            'webpack'
          ),
          ', ',
          _react2['default'].createElement(
            'a',
            { href: 'https://babeljs.io/', target: '_blank' },
            'Babel'
          ),
          ', ',
          _react2['default'].createElement(
            'a',
            { href: 'http://getbootstrap.com/', target: '_blank' },
            'Bootstrap'
          ),
          ', and ',
          _react2['default'].createElement(
            'a',
            { href: 'https://facebook.github.io/react/', target: '_blank' },
            'React'
          )
        )
      );
    }
  }, {
    key: '_renderSocialButtons',
    value: function _renderSocialButtons() {
      return _react2['default'].createElement(
        'ul',
        { className: 'socialButtons' },
        _react2['default'].createElement(
          'li',
          null,
          _react2['default'].createElement('iframe', {
            className: 'socialButtonFrame',
            src: 'https://ghbtns.com/github-btn.html?user=exponentjs&type=follow&size=small',
            scrolling: 'no',
            style: { width: 134, height: 20 }
          })
        ),
        _react2['default'].createElement(
          'li',
          null,
          _react2['default'].createElement('iframe', {
            className: 'socialButtonFrame',
            src: 'https://platform.twitter.com/widgets/follow_button.html?screen_name=exponentjs&show_count=false&show_screen_name=true&size=s',
            scrolling: 'no',
            style: { width: 129, height: 20 }
          })
        )
      );
    }
  }]);

  return Footer;
})(_react2['default'].Component);

module.exports = exports['default'];
/*
<Nav navbar right>
 <NavItemLink to="home">Home</NavItemLink>
</Nav>
*/
//# sourceMappingURL=../../sourcemaps/web/browser/Site.js.map