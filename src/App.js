import React from 'react';
import axios from 'axios';

export default class App extends React.Component {
  state = {
    seasons: []
  }

  componentDidMount() {
    axios.get('http://ergast.com/api/f1/seasons.json')
    .then(res => {
      const seasons = res.data.MRData.SeasonTable.Seasons;
      this.setState({ seasons });
    })
  }

  render() {
    return (
      <ul>
        { this.state.seasons.map(seasons => <li>{seasons.season}</li>) }
        { this.state.seasons.map(seasons => <li>{seasons.url}</li>)}
      </ul>
    )
  }
}
