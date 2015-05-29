import React from 'react';
import {
  CollapsibleNav,
  Nav,
  Navbar,
} from 'react-bootstrap';
import {
  Link,
  RouteHandler,
} from 'react-router';
import {
  NavItemLink,
} from 'react-router-bootstrap';

export default class Site extends React.Component {
  render() {
    if (!process.pid) {
      require('./styles/site.less');
    }
    return (
      <div className="site">
        <Navbar brand={this._renderBrandLink()} toggleNavKey="0">
          <CollapsibleNav eventKey="0">
            <Nav navbar>
              <NavItemLink to="home">Home</NavItemLink>
              <NavItemLink to="docs">Get Started</NavItemLink>
              <NavItemLink to="community">Community</NavItemLink>
              <NavItemLink to="help">Help</NavItemLink>
            </Nav>
            {/*
            <Nav navbar right>
              <NavItemLink to="home">Home</NavItemLink>
            </Nav>
            */}
          </CollapsibleNav>
        </Navbar>
        <div className="siteContent">
          <RouteHandler />
        </div>
        <Footer />
      </div>
    );
  }

  _renderBrandLink() {
    return (
      <Link to="home" className="logoType navLogoType">
        <img
          src="/images/exponent-nav-bare@3x.png"
          alt="Exponent"
        />
        Exponent
      </Link>
    );
  }
}

class Footer extends React.Component {
  render() {
    return (
      <footer className="siteFooter container">
        {this._renderSocialButtons()}
        <ul className="footerLinks">
          <li><Link to="help">Help</Link></li>
          <li>·</li>
          <li><Link to="privacy">Privacy Policy</Link></li>
          <li>·</li>
          <li><Link to="terms">Terms of Service</Link></li>
        </ul>
        <p className="footerTechnologies">
          This site was built with <a href="https://iojs.org" target="_blank">io.js</a>, <a href="http://koajs.com/" target="_blank">koa</a>, <a href="https://babeljs.io/" target="_blank">Babel</a>, <a href="https://facebook.github.io/react/" target="_blank">React</a>, and <a href="http://getbootstrap.com/" target="_blank">Bootstrap</a>
        </p>
      </footer>
    );
  }

  _renderSocialButtons() {
    return (
      <ul className="socialButtons">
        <li>
          <iframe
            className="socialButtonFrame"
            src="https://ghbtns.com/github-btn.html?user=exponentjs&type=follow&size=small"
            scrolling="no"
            style={{width: 134, height: 20}}
          />
        </li>
        <li>
          <iframe
            className="socialButtonFrame"
            src="https://platform.twitter.com/widgets/follow_button.html?screen_name=exponentjs&show_count=false&show_screen_name=true&size=s"
            scrolling="no"
            style={{width: 129, height: 20}}
          />
        </li>
      </ul>
    );
  }
}
