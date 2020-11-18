import React from 'react';
import axios from 'axios';

export default class Drivers extends React.Component {
  state = {
    drivers: []
  }

  componentDidMount() {
    axios.get('http://ergast.com/api/f1/drivers.json')
    .then(res => {
      const drivers = res.data.MRData.DriverTable.Drivers;
      this.setState({ drivers });
    })
  }

  render() {
    return (
      <ul>
        { this.state.drivers.map( e =>
          <li key={ e.familyName+e.givenName }>
            { e.givenName } { e.familyName }
          </li>) }
      </ul>
    )
  }
}
