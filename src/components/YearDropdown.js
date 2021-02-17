import React from 'react';
import axios from 'axios';

import Dropdown from 'react-bootstrap/Dropdown';

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
            <>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {this.state.list.map(d => <Dropdown.Item onSelect={() => this.props.setYear(d)}>{d}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
            </>
          );
      }
}

export default YearDropdown;