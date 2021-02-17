import React from 'react';

import YearDropdown from './YearDropdown';

class App extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      year: 0
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
        <h1>{this.state.year}</h1>
      </>
    )
  }

}

export default App;
