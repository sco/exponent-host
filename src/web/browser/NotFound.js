import React from 'react';

export default class NotFound extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 className="page-header">Page Not Found <small>Sorry about that</small></h1>
        <p>
          We couldn't find the page you were looking for. The link you followed may be broken. If you believe this page should work for you, please open an issue over at <a href="https://github.com/exponentjs/exponent-host/issues" target="_blank">our GitHub repository</a>.
        </p>
        <p className="text-center">
          <img
            className="notFoundPicture center-block img-rounded"
            src="/images/polar-bear-hug@3x.jpg"
            style={{height: 225, width: 300}}
          />
          <span className="text-muted">It'll be okay</span>
        </p>
      </div>
    );
  }
}
