import React from 'react';
import axios from 'axios';
import wiki from 'wikijs';

import Card from 'react-bootstrap/Card';

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

            const promise1 = data.map(driver =>
              wiki().page(`${driver.Driver.givenName} ${driver.Driver.familyName}`)
              .then(page => page.mainImage())
            )

            const promise2 = data.map(driver =>
              axios.get(`http://ergast.com/api/f1/drivers/${driver.Driver.familyName}/driverStandings.json?limit=500`)
                .then(res => {
                  let data = res.data.MRData.StandingsTable.StandingsLists;
                  
                  let totalWins = 0, totalPoints = 0;
                
                  data.forEach(list => {
                    totalWins += +list.DriverStandings[0].wins;
                    totalPoints += +list.DriverStandings[0].points;
                  })

                  return totalWins
                })
            )

            Promise.all(promise1, promise2).then((results) => {
              const newData = data.map((driver, idx) => ({...driver, image: results[idx]}))
              this.setState({ drivers: newData })
            })
          })
          .then()
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
                  {this.state.drivers.map(driver => 
                  <Card style={{ width: '18rem' }}>
                    <Card.Img style={{ width: '8rem' }} variant="top" src={`${driver.image}`} />
                    <Card.Body>
                        <Card.Title>{driver.Driver.givenName} {driver.Driver.familyName}</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
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