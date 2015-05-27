'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createDecoratedClass = require('babel-runtime/helpers/create-decorated-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _coreDecorators = require('core-decorators');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

require('react-router-bootstrap');

var Home = (function (_React$Component) {
  function Home() {
    _classCallCheck(this, Home);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Home, _React$Component);

  _createDecoratedClass(Home, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'h1',
          null,
          'Exponent'
        ),
        _react2['default'].createElement(
          'h2',
          null,
          'Exponent is an app for React Native developers.'
        ),
        _react2['default'].createElement('img', { src: 'http://cdc03.com/ExponentIcon@3x.png' }),
        _react2['default'].createElement(
          'p',
          null,
          'With Exponent, you can write React Native experiences with any computer and a text editor and a phone. No need for Xcode or a simulator. Download the app now to get started.'
        ),
        this._renderDownloadButton()
      );
    }
  }, {
    key: '_renderDownloadButton',
    value: function _renderDownloadButton() {
      return _react2['default'].createElement(
        _reactBootstrap.Button,
        { bsStyle: 'primary', onClick: this._downloadApp },
        'Download'
      );
    }
  }, {
    key: '_downloadApp',
    decorators: [_coreDecorators.autobind],
    value: function _downloadApp() {
      var manifestUrl = 'https://www.dropbox.com/s/wjr7trh1zg12s6b/manifest.plist?dl=1';
      var url = 'itms-services://?action=download-manifest&url=' + encodeURIComponent(manifestUrl);
      window.location = url;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }]);

  return Home;
})(_react2['default'].Component);

exports['default'] = Home;
module.exports = exports['default'];
//# sourceMappingURL=../sourcemaps/web/Home.js.map