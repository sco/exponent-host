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
          _react2['default'].createElement('link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/favicons/apple-touch-icon-180x180.png' }),
          _react2['default'].createElement('link', { rel: 'icon', type: 'image/png', href: '/images/favicons/favicon-32x32.png', sizes: '32x32' }),
          _react2['default'].createElement('meta', { name: 'msapplication-TileColor', content: '#023c69' }),
          _react2['default'].createElement('meta', { name: 'msapplication-TileImage', content: '/images/favicons/mstile-144x144.png' }),
          _react2['default'].createElement('meta', { name: 'theme-color', content: '#023c69' })
        ),
        _react2['default'].createElement(
          'body',
          null,
          _react2['default'].createElement('div', { id: 'root' })
        ),
        _react2['default'].createElement('script', { src: '/assets/bundle.js' })
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
/*
<link rel="apple-touch-icon" sizes="57x57" href="/images/favicons/apple-touch-icon-57x57.png" />
<link rel="apple-touch-icon" sizes="60x60" href="/images/favicons/apple-touch-icon-60x60.png" />
<link rel="apple-touch-icon" sizes="72x72" href="/images/favicons/apple-touch-icon-72x72.png" />
<link rel="apple-touch-icon" sizes="76x76" href="/images/favicons/apple-touch-icon-76x76.png" />
<link rel="apple-touch-icon" sizes="114x114" href="/images/favicons/apple-touch-icon-114x114.png" />
<link rel="apple-touch-icon" sizes="120x120" href="/images/favicons/apple-touch-icon-120x120.png" />
<link rel="apple-touch-icon" sizes="144x144" href="/images/favicons/apple-touch-icon-144x144.png" />
<link rel="apple-touch-icon" sizes="152x152" href="/images/favicons/apple-touch-icon-152x152.png" />
*/ /*
   <link rel="icon" type="image/png" href="/images/favicons/favicon-96x96.png" sizes="96x96" />
   <link rel="icon" type="image/png" href="/images/favicons/favicon-16x16.png" sizes="16x16" />
   <link rel="icon" type="image/png" href="/images/favicons/android-chrome-192x192.png" sizes="192x192" />
   <link rel="manifest" href="/images/favicons/manifest.json" />
   */
//# sourceMappingURL=../../sourcemaps/web/server/Page.js.map