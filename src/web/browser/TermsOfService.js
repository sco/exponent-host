import React from 'react';
import {
  Link,
} from 'react-router';

export default class TermsOfService extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 className="page-header">Terms of Service</h1>
        <p>
          By using the exponentjs.com website ("Service"), or any services of 650 Industries, Inc ("Exponent"), you are agreeing to be bound by the following terms and conditions ("Terms of Service"). IF YOU ARE ENTERING INTO THIS AGREEMENT ON BEHALF OF A COMPANY OR OTHER LEGAL ENTITY, YOU REPRESENT THAT YOU HAVE THE AUTHORITY TO BIND SUCH ENTITY, ITS AFFILIATES AND ALL USERS WHO ACCESS OUR SERVICES THROUGH YOUR ACCOUNT TO THESE TERMS AND CONDITIONS, IN WHICH CASE THE TERMS "YOU" OR "YOUR" SHALL REFER TO SUCH ENTITY, ITS AFFILIATES AND USERS ASSOCIATED WITH IT. IF YOU DO NOT HAVE SUCH AUTHORITY, OR IF YOU DO NOT AGREE WITH THESE TERMS AND CONDITIONS, YOU MUST NOT ACCEPT THIS AGREEMENT AND MAY NOT USE THE SERVICES.
        </p>
        <p>
          If Exponent makes material changes to these Terms, we will notify you by email or by posting a notice on our site before the changes are effective. Any new features that augment or enhance the current Service, including the release of new tools and resources, shall be subject to the Terms of Service. Continued use of the Service after any such changes shall constitute your consent to such changes. You can review the most current version of the Terms of Service at any time at: <Link to="terms">http://exponentjs.com/terms</Link>.
        </p>
        <p>
          Violation of any of the terms below will result in the termination of your Account. While Exponent prohibits such conduct and Content on the Service, you understand and agree that Exponent cannot be responsible for the Content posted on the Service and you nonetheless may be exposed to such materials. You agree to use the Service at your own risk.
        </p>

        <h2>A. Account Terms</h2>
        <ol>
          <li>You must be 13 years or older to use this Service.</li>
          <li>You must be a human. Accounts registered by "bots" or other automated methods are not permitted.</li>
          <li>You must provide your name, a valid email address, and any other information requested in order to complete the signup process.</li>
          <li>Your login may only be used by one person - a single login shared by multiple people is not permitted.</li>
          <li>You are responsible for maintaining the security of your account and password. Exponent cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.</li>
          <li>You are responsible for all Content posted and activity that occurs under your account (even when Content is posted by others who have accounts under your account).</li>
          <li>One person or legal entity may not maintain more than one free account.</li>
          <li>You may not use the Service for any illegal or unauthorized purpose. You must not, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright or trademark laws).</li>
        </ol>

        <h2>B. API Terms</h2>
        <p>
          Customers may access their Exponent account data via an API (Application Program Interface). Any use of the API, including use of the API through a third-party product that accesses Exponent, is bound by these Terms of Service plus the following specific terms:
        </p>
        <ol>
          <li>You expressly understand and agree that Exponent shall not be liable for any direct, indirect, incidental, special, consequential or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data or other intangible losses (even if Exponent has been advised of the possibility of such damages), resulting from your use of the API or third-party products that access data via the API.</li>
          <li>Abuse or excessively frequent requests to Exponent via the API may result in the temporary or permanent suspension of your account's access to the API. Exponent, in its sole discretion, will determine abuse or excessive usage of the API. Exponent will make a reasonable attempt via email to warn the account owner prior to suspension.</li>
          <li>Exponent reserves the right at any time to modify or discontinue, temporarily or permanently, your access to the API (or any part thereof) with or without notice.</li>
        </ol>

        <h2>C. Cancellation and Termination</h2>
        <ol>
          {/*<li>You are solely responsible for properly canceling your account. An email or phone request to cancel your account is not considered cancellation. You can cancel your account at any time by clicking on the Account link in the global navigation bar at the top of the screen. The Account screen provides a simple no questions asked cancellation link.</li>*/}
          <li>All of your Content will be immediately deleted from the Service upon cancellation. This information can not be recovered once your account is cancelled.</li>
          <li>Exponent, in its sole discretion, has the right to suspend or terminate your account and refuse any and all current or future use of the Service, or any other Exponent service, for any reason at any time. Such termination of the Service will result in the deactivation or deletion of your Account or your access to your Account, and the forfeiture and relinquishment of all Content in your Account. Exponent reserves the right to refuse service to anyone for any reason at any time.</li>
          <li>In the event that Exponent takes action to suspend or terminate an account, we will make a reasonable effort to provide the affected account owner with a copy of their account contents upon request, unless the account was suspended or terminated due to unlawful conduct.</li>
        </ol>

        <h2>D. Modifications to the Service and Prices</h2>
        <ol>
          <li>Exponent reserves the right at any time and from time to time to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice.</li>
          <li>Exponent shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.</li>
        </ol>

        <h2>E. Copyright and Content Ownership</h2>
        <ol>
          <li>We claim no intellectual property rights over the material you provide to the Service. Your profile and materials uploaded remain yours. However, by setting your pages to be viewed publicly, you agree to allow others to view your Content. By setting your repositories to be viewed publicly, you agree to allow others to view and fork your repositories.</li>
          <li>Exponent does not pre-screen Content, but Exponent and its designee have the right (but not the obligation) in their sole discretion to refuse or remove any Content that is available via the Service.</li>
          <li>You shall defend Exponent against any claim, demand, suit or proceeding made or brought against Exponent by a third-party alleging that Your Content, or Your use of the Service in violation of this Agreement, infringes or misappropriates the intellectual property rights of a third-party or violates applicable law, and shall indemnify Exponent for any damages finally awarded against, and for reasonable attorney’s fees incurred by, Exponent in connection with any such claim, demand, suit or proceeding; provided, that Exponent (a) promptly gives You written notice of the claim, demand, suit or proceeding; (b) gives You sole control of the defense and settlement of the claim, demand, suit or proceeding (provided that You may not settle any claim, demand, suit or proceeding unless the settlement unconditionally releases Exponent of all liability); and (c) provides to You all reasonable assistance, at Your expense.</li>
          <li>The look and feel of the Service is copyright ©2015-present 650 Industries, Inc. All rights reserved. You may not duplicate, copy, or reuse any portion of the Exponent mobile application without express written permission from Exponent. The Exponent website and command-line interface is open-sourced under the MIT license.</li>
        </ol>

        <h2>F. General Conditions</h2>
        <ol>
          <li>Your use of the Service is at your sole risk. The service is provided on an "as is" and "as available" basis.</li>
          <li>Support for Exponent services is only available in English, via email.</li>
          <li>You understand that Exponent uses third-party vendors and hosting partners to provide the necessary hardware, software, networking, storage, and related technology required to run the Service.</li>
          <li>You must not modify, adapt or hack the Service or modify another website so as to falsely imply that it is associated with the Service, Exponent, or any other Exponent service.</li>
          <li>You may use the Exponent Pages static hosting service solely as permitted and intended to host your organization pages, personal pages, or project pages, and for no other purpose. You may not use Exponent Pages in violation of Exponent's trademark or other rights or in violation of applicable law. Exponent reserves the right at all times to reclaim any Exponent subdomain without liability to you.</li>
          <li>You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service without the express written permission by Exponent.</li>
          <li>We may, but have no obligation to, remove Content and Accounts containing Content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party's intellectual property or these Terms of Service.</li>
          <li>Verbal, physical, written or other abuse (including threats of abuse or retribution) of any Exponent customer, employee, member, or officer will result in immediate account termination.</li>
          <li>You understand that the technical processing and transmission of the Service, including your Content, may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices.</li>
          <li>You must not upload, post, host, or transmit unsolicited email, SMSs, or "spam" messages.</li>
          <li>You must not transmit any worms or viruses or any code of a destructive nature.</li>
          <li>If your bandwidth usage significantly exceeds the average bandwidth usage (as determined solely by Exponent) of other Exponent customers, we reserve the right to immediately disable your account or throttle your file hosting until you can reduce your bandwidth consumption.</li>
          <li>Exponent does not warrant that (i) the service will meet your specific requirements, (ii) the service will be uninterrupted, timely, secure, or error-free, (iii) the results that may be obtained from the use of the service will be accurate or reliable, (iv) the quality of any products, services, information, or other material purchased or obtained by you through the service will meet your expectations, and (v) any errors in the Service will be corrected.</li>
          <li>You expressly understand and agree that Exponent shall not be liable for any direct, indirect, incidental, special, consequential or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data or other intangible losses (even if Exponent has been advised of the possibility of such damages), resulting from: (i) the use or the inability to use the service; (ii) the cost of procurement of substitute goods and services resulting from any goods, data, information or services purchased or obtained or messages received or transactions entered into through or from the service; (iii) unauthorized access to or alteration of your transmissions or data; (iv) statements or conduct of any third-party on the service; (v) or any other matter relating to the service.</li>
          <li>The failure of Exponent to exercise or enforce any right or provision of the Terms of Service shall not constitute a waiver of such right or provision. The Terms of Service constitutes the entire agreement between you and Exponent and govern your use of the Service, superseding any prior agreements between you and Exponent (including, but not limited to, any prior versions of the Terms of Service). You agree that these Terms of Service and Your use of the Service are governed under California law.</li>
          <li>Questions about the Terms of Service should be sent to support@exponentjs.com.</li>
        </ol>
      </div>
    );
  }
}
