var React = require('react');

class Home extends React.Component {
  render() {
    require('./style.css');
    return (
      <div>
        hello
      </div>
    );
  }
}


React.render(<Home />, document.getElementById('react'));

export default Home;
