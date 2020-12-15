import React from 'react';
import axios from 'axios';
import Select from 'react-select';

const options = [
  { value: 'Lewis Hamilton', label: 'Lewis Hamilton' },
  { value: 'Max Verstappen', label: 'Max Verstappen' },
  { value: 'George Russell', label: 'George Russel' }
];

export default class Drivers extends React.Component {
  state = {
    drivers: [],
    selectedOption: null,
  };
  handleChange = selectedOption => {
    this.setState(
      { selectedOption }
    );
  };

  componentDidMount() {
    axios.get('http://ergast.com/api/f1/2020/drivers.json')
    .then(res => {
      const drivers = res.data.MRData.DriverTable.Drivers;
      this.setState({ drivers });
    })
  }

  render() {
    const { selectedOption } = this.state;

    return (
      <React.Fragment>
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
        />
        <ul>
          { this.state.drivers.map( e =>
            <li key={ e.familyName+e.givenName }>
              { e.givenName } { e.familyName }
            </li>) }
        </ul>
      </React.Fragment>
    );
  }
}
