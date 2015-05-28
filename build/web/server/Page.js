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

var Page = (function (_React$Component) {
  function Page() {
    _classCallCheck(this, Page);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Page, _React$Component);

  _createClass(Page, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'html',
        null,
        _react2['default'].createElement(
          'head',
          null,
          _react2['default'].createElement('meta', { charSet: 'utf-8' }),
          _react2['default'].createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
          _react2['default'].createElement(
            'title',
            null,
            'Exponent'
          ),
          _react2['default'].createElement('link', {
            rel: 'stylesheet',
            href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css'
          }),
          _react2['default'].createElement('script', { src: 'http://localhost:7272/bundle.js', defer: true })
        ),
        _react2['default'].createElement(
          'body',
          null,
          _react2['default'].createElement('div', { id: 'root', dangerouslySetInnerHTML: this.props.markup })
        )
      );
    }
  }], [{
    key: 'doctype',
    value: '<!DOCTYPE html>',
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      markup: _react.PropTypes.shape({
        __html: _react.PropTypes.string.isRequired }).isRequired },
    enumerable: true
  }]);

  return Page;
})(_react2['default'].Component);

exports['default'] = Page;
module.exports = exports['default'];
//# sourceMappingURL=../../sourcemaps/web/server/Page.js.map