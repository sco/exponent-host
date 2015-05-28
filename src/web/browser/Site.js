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
      require('./site.less');
    }
    return (
      <div>
        <Navbar brand={<Link to="home">Exponent</Link>} toggleNavKey="0">
          <CollapsibleNav eventKey="0">
            <Nav navbar>
              <NavItemLink to="home">Home</NavItemLink>
              <NavItemLink to="docs">Docs</NavItemLink>
              <NavItemLink to="community">Community</NavItemLink>
              <NavItemLink to="help">Help</NavItemLink>
            </Nav>
            <Nav navbar right>
              <NavItemLink to="home">Home</NavItemLink>
            </Nav>
          </CollapsibleNav>
        </Navbar>
        <RouteHandler />
        <Footer />
      </div>
    );
  }
}

class Footer extends React.Component {
  render() {
    return (
      <footer className="bs-docs-footer">
        <div className="container">
          <div className="bs-docs-social">
            <ul className="bs-docs-social-buttons">
              <li>
                <iframe
                  className="social-iframe github-btn"
                  src="https://ghbtns.com/github-btn.html?user=exponentjs&type=follow&size=large"
                  scrolling="no"
                  style={{width: 196, height: 30}}
                />
              </li>
              <li>
                <iframe
                  className="social-iframe"
                  src="https://platform.twitter.com/widgets/follow_button.html?screen_name=exponentjs&show_count=false&show_screen_name=true&size=l"
                  scrolling="no"
                  style={{width: 161, height: 28}}
                />
              </li>
            </ul>
          </div>
          <p>Exponent is more delightful than projects that call themselves delightful and is made with more love than products that say they're made with love and is made in California more than your iPhone.</p>
          <ul className="bs-docs-footer-links muted">

            <li>·</li>
            <li><a href="https://github.com/react-bootstrap/react-bootstrap/">GitHub</a></li>
            <li>·</li>
            <li><a href="https://github.com/react-bootstrap/react-bootstrap/issues?state=open">Issues</a></li>
            <li>·</li>
            <li><a href="https://github.com/react-bootstrap/react-bootstrap/releases">Releases</a></li>
          </ul>
          <Link to="privacy">Privacy Policy</Link>
          <Link to="terms">Terms of Service</Link>
        </div>
      </footer>
    );
  }


}
