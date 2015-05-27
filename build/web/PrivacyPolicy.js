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

var PrivacyPolicy = (function (_React$Component) {
  function PrivacyPolicy() {
    _classCallCheck(this, PrivacyPolicy);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(PrivacyPolicy, _React$Component);

  _createClass(PrivacyPolicy, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'h1',
          null,
          'Privacy Policy'
        ),
        'we won\'t sell your email address'
      );
    }
  }]);

  return PrivacyPolicy;
})(_react2['default'].Component);

exports['default'] = PrivacyPolicy;
module.exports = exports['default'];
//# sourceMappingURL=../sourcemaps/web/PrivacyPolicy.js.map