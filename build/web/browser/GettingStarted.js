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

var _InstallationButton = require('./InstallationButton');

var _InstallationButton2 = _interopRequireDefault(_InstallationButton);

var GettingStarted = (function (_React$Component) {
  function GettingStarted() {
    _classCallCheck(this, GettingStarted);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(GettingStarted, _React$Component);

  _createClass(GettingStarted, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'container' },
        _react2['default'].createElement(
          'h1',
          { className: 'page-header' },
          'Getting Started ',
          _react2['default'].createElement(
            'small',
            null,
            'Create your first Exponent article'
          )
        ),
        _react2['default'].createElement(
          'p',
          null,
          'All you need is your computer and iPhone to start creating articles with Exponent using React Native.'
        ),
        _react2['default'].createElement(
          'h2',
          null,
          'Install Exponent'
        ),
        _react2['default'].createElement(
          'p',
          null,
          'Install Exponent on your iPhone by tapping this button.',
          _react2['default'].createElement(_InstallationButton2['default'], null),
          'Exponent will download to your homescreen. The first time you launch the app, you\'ll see a message asking you to give the app permission to run. This is just because the app is being installed outside of the App Store, but it still can\'t do anything a normal app isn\'t allowed to do in terms of security.'
        ),
        _react2['default'].createElement(
          'h2',
          null,
          'Make a Project'
        ),
        _react2['default'].createElement(
          'p',
          null,
          'If you don\'t already have ',
          _react2['default'].createElement(
            'code',
            null,
            'io.js'
          ),
          ' installed, do that using ',
          _react2['default'].createElement(
            'code',
            null,
            'nvm'
          ),
          ' (find it at ',
          _react2['default'].createElement(
            'a',
            { href: 'https://github.com/creationix/nvm' },
            'https://github.com/creationix/nvm'
          ),
          ').'
        ),
        _react2['default'].createElement(
          'p',
          null,
          'On your computer, get the Exponent program by running ',
          _react2['default'].createElement(
            'code',
            null,
            'npm install -g exp'
          ),
          '.'
        ),
        _react2['default'].createElement(
          'p',
          null,
          'Next, in an empty directory, run ',
          _react2['default'].createElement(
            'code',
            null,
            'exp init'
          ),
          ' to create a file with your app\'s code.'
        ),
        _react2['default'].createElement(
          'p',
          null,
          'Serve the app with ',
          _react2['default'].createElement(
            'code',
            null,
            'exp start'
          ),
          ' and enter your phone number or email address when prompted.'
        ),
        _react2['default'].createElement(
          'p',
          null,
          'Open the email or text we sent you on your phone and tap the link inside to open your app.'
        ),
        _react2['default'].createElement(
          'h2',
          null,
          'Next Steps'
        ),
        _react2['default'].createElement(
          'p',
          null,
          'When you ran ',
          _react2['default'].createElement(
            'code',
            null,
            'exp init'
          ),
          ', we made a file called ',
          _react2['default'].createElement(
            'code',
            null,
            'index.js'
          ),
          '. Edit this file and tap the refresh button in Exponent to see your latest work.'
        ),
        _react2['default'].createElement(
          'p',
          null,
          'Exponent also works with your existing React Native apps. Set the name of your component to "main" in the app registry and run ',
          _react2['default'].createElement(
            'code',
            null,
            'exp start'
          ),
          ' from your app\'s directory.'
        ),
        _react2['default'].createElement(
          'h2',
          null,
          'Publishing'
        ),
        _react2['default'].createElement(
          'p',
          null,
          'When you\'re happy with something you\'ve made, you can upload it to be shared with others even when your computer is offline using ',
          _react2['default'].createElement(
            'code',
            null,
            'exp publish'
          ),
          '. Just run ',
          _react2['default'].createElement(
            'code',
            null,
            'exp adduser'
          ),
          ' to create an exp.host account, and then ',
          _react2['default'].createElement(
            'code',
            null,
            'exp publish'
          ),
          ' to publish your article, and we\'ll give you the URL it\'s been published to that you can share with anyone. (You can share your development URLs too but they won\'t be as fast and won\'t work if your computer is offline.)'
        )
      );
    }
  }]);

  return GettingStarted;
})(_react2['default'].Component);

exports['default'] = GettingStarted;
module.exports = exports['default'];
//# sourceMappingURL=../../sourcemaps/web/browser/GettingStarted.js.map