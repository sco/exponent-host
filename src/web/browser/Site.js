import React from 'react';
import {
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
    //require('./site.css');
    return (
      <div>
        <Navbar brand={<Link to="home">Exponent</Link>}>
          <Nav>
            <NavItemLink to="home">Home</NavItemLink>
            <NavItemLink to="docs">Docs</NavItemLink>
            <NavItemLink to="community">Community</NavItemLink>
            <NavItemLink to="help">Help</NavItemLink>
          </Nav>
          <Nav className="nav-right">
            <NavItemLink to="home">Home</NavItemLink>
          </Nav>
        </Navbar>
        <RouteHandler />
        <footer>
          Slack / Twitter / FB / CLI github / API github
          <Link to="privacy">Privacy Policy</Link>
          <Link to="terms">Terms of Service</Link>
        </footer>
      </div>
    );
  }
}
