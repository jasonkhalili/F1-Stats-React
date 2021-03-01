import React from 'react';
import axios from 'axios';
import wiki from 'wikijs';

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

            const promises = data.map(driver =>
              wiki().page(`${driver.Driver.givenName} ${driver.Driver.familyName}`)
              .then(page => page.mainImage())
            );

            Promise.all(promises).then(images => {
              const newData = data.map((driver, idx) => ({...driver, image: images[idx]}))
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
          console.log(this.state.drivers[0])
          console.log(this.state.drivers[0].image)
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