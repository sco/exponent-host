'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _asyncToGenerator = require('babel-runtime/helpers/async-to-generator')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

require('babel/polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _Page = require('./Page');

var _Page2 = _interopRequireDefault(_Page);

var _browserRoutes = require('../browser/routes');

var _browserRoutes2 = _interopRequireDefault(_browserRoutes);

var ServerSideRenderer = (function () {
  function ServerSideRenderer(staticResources) {
    _classCallCheck(this, ServerSideRenderer);

    this.staticResources = staticResources;
  }

  _createClass(ServerSideRenderer, [{
    key: 'renderPageAsync',
    value: _asyncToGenerator(function* (url) {
      // Define __webpack_public_path__ which is used by the JS modules that
      // substitute in for asset files like images

      var _require = require('./stats.json');

      var publicPath = _require.publicPath;

      global.__webpack_public_path__ = publicPath;

      var bodyMarkup = yield this.renderBodyAsync(url);
      var markup = _react2['default'].renderToStaticMarkup(_react2['default'].createElement(_Page2['default'], {
        staticResources: this.staticResources,
        markup: { __html: bodyMarkup }
      }));
      return _Page2['default'].doctype + markup;
    })
  }, {
    key: 'renderBodyAsync',
    value: function renderBodyAsync(url) {
      return new _Promise(function (resolve, reject) {
        _reactRouter2['default'].run(_browserRoutes2['default'], url, function (Root) {
          // TODO: Perform data fetching here and pass it in as props of the root
          var markup = _react2['default'].renderToString(_react2['default'].createElement(Root, null));
          resolve(markup);
        });
      });
    }
  }]);

  return ServerSideRenderer;
})();

exports['default'] = ServerSideRenderer;
module.exports = exports['default'];
//# sourceMappingURL=../../sourcemaps/web/server/ServerSideRenderer.js.map