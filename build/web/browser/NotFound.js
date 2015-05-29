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

var NotFound = (function (_React$Component) {
  function NotFound() {
    _classCallCheck(this, NotFound);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(NotFound, _React$Component);

  _createClass(NotFound, [{
    key: "render",
    value: function render() {
      return _react2["default"].createElement(
        "div",
        { className: "container" },
        _react2["default"].createElement(
          "h1",
          { className: "page-header" },
          "Page Not Found ",
          _react2["default"].createElement(
            "small",
            null,
            "Sorry about that"
          )
        ),
        _react2["default"].createElement(
          "p",
          null,
          "We couldn't find the page you were looking for. The link you followed may be broken. If you believe this page should work for you, please open an issue over at ",
          _react2["default"].createElement(
            "a",
            { href: "https://github.com/exponentjs/exponent-host/issues", target: "_blank" },
            "our GitHub repository"
          ),
          "."
        ),
        _react2["default"].createElement(
          "p",
          { className: "text-center" },
          _react2["default"].createElement("img", {
            className: "notFoundPicture center-block img-rounded",
            src: "/images/polar-bear-hug@3x.jpg",
            style: { height: 225, width: 300 }
          }),
          _react2["default"].createElement(
            "span",
            { className: "text-muted" },
            "It'll be okay"
          )
        )
      );
    }
  }]);

  return NotFound;
})(_react2["default"].Component);

exports["default"] = NotFound;
module.exports = exports["default"];
//# sourceMappingURL=../../sourcemaps/web/browser/NotFound.js.map