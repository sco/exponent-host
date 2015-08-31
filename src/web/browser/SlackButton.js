import React, {
  PropTypes,
} from 'react';

export default class SlackButton extends React.Component {
  static propTypes = {
    size: PropTypes.oneOf(['small', 'large']),
  };

  static defaultProps = {
    size: 'small',
  };

  render() {
    let isSmall = this.props.size === 'small';
    return (
      <span
        ref={component => { this._root = component; }}
        style={{
          display: 'inline-block',
          height: isSmall ? 20 : 30,
          width: isSmall ? 126 : 190,
        }}
      />
    );
  }

  componentDidMount() {
    let isSmall = this.props.size === 'small';
    let scriptUrl = isSmall ?
      'http://slack.exponentjs.com/slackin.js' :
      'http://slack.exponentjs.com/slackin.js?large';

    let script = document.createElement('script');
    script.async = 'async';
    script.defer = 'defer';
    script.src = scriptUrl;

    React.findDOMNode(this._root).appendChild(script);
  }
}
