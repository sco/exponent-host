'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createDecoratedClass = require('babel-runtime/helpers/create-decorated-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _ideCoreDecorators = require('@ide/core-decorators');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

const MANIFEST_URL = 'https://www.dropbox.com/s/wjr7trh1zg12s6b/manifest.plist?dl=1';
const ITUNES_BASE_URL = 'itms-services://?action=download-manifest&url=';

var InstallationButton = (function (_React$Component) {
  function InstallationButton() {
    _classCallCheck(this, InstallationButton);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(InstallationButton, _React$Component);

  _createDecoratedClass(InstallationButton, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        _reactBootstrap.Button,
        _extends({}, this.props, { bsStyle: 'primary', onClick: this._downloadApp }),
        'Install Now'
      );
    }
  }, {
    key: '_downloadApp',
    decorators: [_ideCoreDecorators.autobind],
    value: function _downloadApp() {
      var url = ITUNES_BASE_URL + encodeURIComponent(MANIFEST_URL);
      window.location = url;
    }
  }]);

  return InstallationButton;
})(_react2['default'].Component);

exports['default'] = InstallationButton;
module.exports = exports['default'];
//# sourceMappingURL=../../sourcemaps/web/browser/InstallationButton.js.map