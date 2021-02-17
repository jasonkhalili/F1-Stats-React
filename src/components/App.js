import React from 'react';

import YearDropdown from './YearDropdown';
import Cards from './Cards';

class App extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      year: 0,
    };
  }

  setYear = (y) => {
    this.setState({
      year: y
    });
  }

  render() {
    return (
      <>
        <YearDropdown year={this.state.year} setYear={this.setYear} />
        <Cards year={this.state.year}></Cards>
      </>
    )
  }

}

export default App;
