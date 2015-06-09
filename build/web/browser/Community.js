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

var Community = (function (_React$Component) {
  function Community() {
    _classCallCheck(this, Community);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Community, _React$Component);

  _createClass(Community, [{
    key: "render",
    value: function render() {
      return _react2["default"].createElement(
        "div",
        { className: "container" },
        _react2["default"].createElement(
          "h1",
          { className: "page-header" },
          "Community"
        ),
        _react2["default"].createElement(
          "p",
          null,
          "Come join some of the most creative and talented React Native developers. The Exponent community welcomes people who are learning React Native as well as experts looking to push the core framework forward."
        ),
        _react2["default"].createElement(
          "h2",
          null,
          "Slack ",
          _react2["default"].createElement(
            "small",
            null,
            "Chat with fellow developers"
          )
        ),
        _react2["default"].createElement(
          "p",
          null,
          "Come join our Slack team! Enter your email in the Exponent app and we'll send you an invite. We'll make it so that you can get an invite from this site too. It's on our to-do list. Or if this sounds like a feature you'd like to try your hand at, send us a PR."
        ),
        _react2["default"].createElement(
          "h2",
          null,
          "GitHub ",
          _react2["default"].createElement(
            "small",
            null,
            "Become a contributor"
          )
        ),
        _react2["default"].createElement(
          "p",
          null,
          "We have two main open-source GitHub repositories at ",
          _react2["default"].createElement(
            "a",
            { href: "https://github.com/exponentjs" },
            "@exponentjs"
          ),
          ". The one for this website and the Exponent hosting service is called ",
          _react2["default"].createElement(
            "a",
            { href: "https://github.com/exponentjs/exponent-host" },
            _react2["default"].createElement(
              "strong",
              null,
              "exponent-host"
            )
          ),
          ". If you're working on documentation or have a cool idea for the server, this is the repo you'll want to look at."
        ),
        _react2["default"].createElement(
          "p",
          null,
          "The other repository is for the ",
          _react2["default"].createElement(
            "code",
            null,
            "exp"
          ),
          " program and is called ",
          _react2["default"].createElement(
            "a",
            { href: "https://github.com/exponentjs/exp" },
            _react2["default"].createElement(
              "strong",
              null,
              "exp"
            )
          ),
          ". This is the repo to look at if you're adding new command-line actions or are improving the development workflow."
        ),
        _react2["default"].createElement(
          "p",
          null,
          "Our Slack chat is the best place to discuss pull requests, how you might implement a new feature or fix a bug, and ask questions about contributing."
        ),
        _react2["default"].createElement(
          "h2",
          null,
          "Twitter ",
          _react2["default"].createElement(
            "small",
            null,
            "Keep up-to-date"
          )
        ),
        _react2["default"].createElement(
          "p",
          null,
          "We tweet about updates, new features, and pro tips. Follow us at ",
          _react2["default"].createElement(
            "a",
            { href: "https://twitter.com/exponentjs", target: "_blank" },
            "@exponentjs"
          ),
          ". That's a pro tip."
        )
      );
    }
  }]);

  return Community;
})(_react2["default"].Component);

exports["default"] = Community;
module.exports = exports["default"];
//# sourceMappingURL=../../sourcemaps/web/browser/Community.js.map