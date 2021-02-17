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

    componentWillReceiveProps() {
        if (this.props.year !== 0) {
          axios.get(`http://ergast.com/api/f1/${this.props.year}/driverStandings.json?limit=300`)
            .then(res => {
              let data = res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
              console.log(data);
              this.setState({
                //drivers: data.map(d => d)
              })
            })
            .catch(function(error) {
              console.log(error);
            })
        }
      }

    render() {
        return (
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            </Card>
        )
    }
}

export default Cards;