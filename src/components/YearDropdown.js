import React from 'react';
import axios from 'axios';

class YearDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          list: []
        };
      }    
    
      componentDidMount() {
        axios.get('http://ergast.com/api/f1/seasons.json?limit=300')
            .then(res => {
                let seasons = res.data.MRData.SeasonTable.Seasons;
                this.setState({
                    list: seasons.map(d => d.season),
                });
            })
            .catch(function (error) {
                console.log(error);
            })
      }

      render() {
          return (

              <ul>{this.state.list.map(d => <li>{d}</li>)}</ul>
          )
      }
}

export default YearDropdown;