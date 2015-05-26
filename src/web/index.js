import React from 'react';

import Hello from './hello';

class Home extends React.Component {
  render() {
    require('./style.css');
    return (
      <div>
        <Hello />
      </div>
    );
  }
}

React.render(<Home />, document.getElementById('react'));

export default Home;
