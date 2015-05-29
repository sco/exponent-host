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

var _InstallationButton = require('./InstallationButton');

var _InstallationButton2 = _interopRequireDefault(_InstallationButton);

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
      return _react2['default'].createElement(
        'div',
        { className: 'home' },
        _react2['default'].createElement(
          _reactBootstrap.Jumbotron,
          { className: 'text-center' },
          _react2['default'].createElement(
            'div',
            { className: 'container' },
            _react2['default'].createElement(
              'h1',
              null,
              'Exponent'
            ),
            _react2['default'].createElement(
              'p',
              null,
              'An app for React Native developers'
            ),
            _react2['default'].createElement('img', {
              className: 'headerLogo',
              src: '/images/exponent-bare@3x.png',
              alt: 'Exponent'
            }),
            _react2['default'].createElement(
              'p',
              { className: 'headerInstructions' },
              'With Exponent, you can write React Native experiences with any computer and a text editor and a phone. No need for Xcode or a simulator. Download the app now to get started.'
            ),
            _react2['default'].createElement(_InstallationButton2['default'], null)
          )
        )
      );
    }
  }]);

  return Home;
})(_react2['default'].Component);

exports['default'] = Home;
module.exports = exports['default'];
//# sourceMappingURL=../../sourcemaps/web/browser/Home.js.map