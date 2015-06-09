"use strict";

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

_Object$defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var Help = (function (_React$Component) {
  function Help() {
    _classCallCheck(this, Help);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Help, _React$Component);

  _createClass(Help, [{
    key: "render",
    value: function render() {
      return _react2["default"].createElement(
        "div",
        { className: "container" },
        _react2["default"].createElement(
          "h1",
          { className: "page-header" },
          "Help and Support"
        ),
        _react2["default"].createElement(
          "p",
          null,
          "Come join our Slack chat and ask your question in the #help channel. Many of the contributors are in the Pacific time zone but some of us usually stay up late too."
        ),
        _react2["default"].createElement(
          "p",
          null,
          "If you have suggestions for what should go here, let us know in Slack or send a pull request for this page on GitHub."
        )
      );
    }
  }]);

  return Help;
})(_react2["default"].Component);

exports["default"] = Help;
module.exports = exports["default"];
//# sourceMappingURL=../../sourcemaps/web/browser/Help.js.map