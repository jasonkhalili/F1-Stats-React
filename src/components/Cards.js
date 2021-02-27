import React from 'react';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drivers: []
        };
    }

    componentDidUpdate(prevProps) {
        if ((this.props.year !== 0) && (this.props.year !== prevProps.year)) {
          axios.get(`http://ergast.com/api/f1/${this.props.year}/driverStandings.json?limit=300`)
            .then(res => {
              let data = res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
              console.log(data);
              this.setState({
                drivers: data.map(d => d)
              })
            })
            .catch(function(error) {
              console.log(error);
            })
        }
      }

      componentWillReceiveProps() {
        if (this.props.year !== 0) {
          axios.get(`http://ergast.com/api/f1/${this.props.year}/driverStandings.json?limit=300`)
            .then(res => {
              let data = res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
              console.log(data);
              this.setState({
                drivers: data.map(d => d)
              })
            })
            .catch(function(error) {
              console.log(error);
            })
        }
      }

    render() {
      if (this.state.drivers.length === 0) {
        return (
          <div></div>
        )
      } else {
          return (
            <>
              <div class="container">
                <div class="row">
                  {this.state.drivers.map(d => 
                  <Card style={{ width: '18rem' }}>
                    <Card.Img style={{ width: '8rem' }} variant="top" src="https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg" />
                    <Card.Body>
                        <Card.Title>{d.Driver.givenName} {d.Driver.familyName}</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </Card>
                  )}
                </div>
              </div>
            </>
        )}
    }
        
}

export default Cards;