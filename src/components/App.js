import React from 'react';
import Drivers from './Drivers';
import Seasons from './Seasons';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Drivers />
        <Seasons />
      </div>
    )
  }
}
