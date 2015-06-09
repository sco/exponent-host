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

var _reactRouter = require('react-router');

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
        { className: 'container' },
        _react2['default'].createElement(
          'h1',
          { className: 'page-header' },
          'Privacy Policy'
        ),
        _react2['default'].createElement(
          'h2',
          null,
          'General Information'
        ),
        _react2['default'].createElement(
          'p',
          null,
          'We collect the e-mail addresses of those who communicate with us via e-mail, aggregate information on what pages consumers access or visit, and information volunteered by the consumer (such as survey information and/or site registrations). The information we collect is used to improve the content of our Web pages and the quality of our service, and is not shared with or sold to other organizations for commercial purposes, except to provide products or services you\'ve requested, when we have your permission, or under the following circumstances:'
        ),
        _react2['default'].createElement(
          'ul',
          null,
          _react2['default'].createElement(
            'li',
            null,
            'It is necessary to share information in order to investigate, prevent, or take action regarding illegal activities, suspected fraud, situations involving potential threats to the physical safety of any person, violations of ',
            _react2['default'].createElement(
              _reactRouter.Link,
              { to: 'terms' },
              'Terms of Service'
            ),
            ', or as otherwise required by law.'
          ),
          _react2['default'].createElement(
            'li',
            null,
            'We transfer information about you if Exponent is acquired by or merged with another company. In this event, Exponent will notify you before information about you is transferred and becomes subject to a different privacy policy.'
          )
        ),
        _react2['default'].createElement(
          'h2',
          null,
          'Information Gathering and Usage'
        ),
        _react2['default'].createElement(
          'p',
          null,
          'When you register for Exponent we ask for information such as your name and email address. Exponent uses collected information for the following general purposes: products and services provision, identification and authentication, services improvement, contact, and research.'
        ),
        _react2['default'].createElement(
          'h2',
          null,
          'Cookies'
        ),
        _react2['default'].createElement(
          'ul',
          null,
          _react2['default'].createElement(
            'li',
            null,
            'A cookie is a small amount of data, which often includes an anonymous unique identifier, that is sent to your browser from a web site\'s computers and stored on your computer\'s hard drive.'
          ),
          _react2['default'].createElement(
            'li',
            null,
            'Cookies are required to use the Exponent service.'
          ),
          _react2['default'].createElement(
            'li',
            null,
            'We use cookies to record current session information, but do not use permanent cookies. You are required to re-login to your Exponent account after a certain period of time has elapsed to protect you against others accidentally accessing your account contents.'
          )
        ),
        _react2['default'].createElement(
          'h2',
          null,
          'Data Storage'
        ),
        _react2['default'].createElement(
          'p',
          null,
          'Exponent uses third-party vendors and hosting partners to provide the necessary hardware, software, networking, storage, and related technology required to run Exponent. Although Exponent owns the code, databases, and all rights to the Exponent application, you retain all rights to your data.'
        ),
        _react2['default'].createElement(
          'h2',
          null,
          'Disclosure'
        ),
        _react2['default'].createElement(
          'p',
          null,
          'Exponent may disclose personally identifiable information under special circumstances, such as to comply with subpoenas or when your actions violate the ',
          _react2['default'].createElement(
            _reactRouter.Link,
            { to: 'terms' },
            'Terms of Service'
          ),
          '.'
        ),
        _react2['default'].createElement(
          'h2',
          null,
          'EU and Swiss Safe Harbor'
        ),
        _react2['default'].createElement(
          'p',
          null,
          'If you choose to provide Exponent with your information, you consent to the transfer and storage of that information on our servers located in the United States.'
        ),
        _react2['default'].createElement(
          'h2',
          null,
          'Changes'
        ),
        _react2['default'].createElement(
          'p',
          null,
          'Exponent may periodically update this policy. We will notify you about significant changes in the way we treat personal information by sending a notice to the primary email address specified in your Exponent account or by placing a prominent notice on our site.'
        ),
        _react2['default'].createElement(
          'h2',
          null,
          'Questions'
        ),
        _react2['default'].createElement(
          'p',
          null,
          'Any questions about this Privacy Policy should be addressed to support@exp.host.'
        )
      );
    }
  }]);

  return PrivacyPolicy;
})(_react2['default'].Component);

exports['default'] = PrivacyPolicy;
module.exports = exports['default'];
/*
<p>
 Exponent adheres to the US-EU and US-Swiss Safe Harbor Privacy Principles of Notice, Choice, Onward Transfer, Security, Data Integrity, Access and Enforcement, and is registered with the U.S. Department of Commerce's Safe Harbor Program <a href="http://www.export.gov/safeharbor/" target="_blank">http://www.export.gov/safeharbor/</a>.
</p>
<p>
 For European Union and Swiss residents, any questions or concerns regarding the use or disclosure of your information should be directed to Exponent by sending an email to support@exp.host. We will investigate and attempt to resolve complaints and disputes regarding use and disclosure of your information in accordance with this Privacy Policy. For complaints that cannot be resolved, and consistent with the Safe Harbor Enforcement Principle, we have committed to cooperate with data protection authorities located within Switzerland or the European Union (or their authorized representatives).
</p>
*/
//# sourceMappingURL=../../sourcemaps/web/browser/PrivacyPolicy.js.map