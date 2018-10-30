import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {getStatuses} from '../store';
import {Header, Table} from 'semantic-ui-react';

class Status extends Component {
  constructor() {
    super();
  };

  async componentDidMount(){
    if(!this.props.status[0]) await this.props.getStatuses();
  }

  render(){
    if(this.props.status[0]){
      const statuses = this.props.status.sort((lineA, lineB) => lineA.name > lineB.name);

      return(
        <div>
        <h1>All Lines</h1> 
          <Table basic='very' celled collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell singleLine>Line Name</Table.HeaderCell>
                <Table.HeaderCell>Current Status</Table.HeaderCell>
                <Table.HeaderCell>Last 15 Mins.</Table.HeaderCell>
                <Table.HeaderCell>Last 30 Mins.</Table.HeaderCell>
                <Table.HeaderCell>Last Hour</Table.HeaderCell>
                <Table.HeaderCell>Official Service Advisories</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
        
            <Table.Body>
              {statuses.map(line => {
                const last15Delays = (line.last15 - line.average15) > (line.average15 * 1.5);
                const last30Delays = (line.last30 - line.average30) > (line.average30 * 1.5);
                const lastHourDelays = (line.lastHour - line.averageHour) > (line.averageHour * 1.5);
                const lineDelayed = last15Delays || last30Delays || lastHourDelays;

                return (
                <Table.Row key={line.name} positive={!lineDelayed} negative={!!lineDelayed}>
                  <Table.Cell>
                    <Header as='h3' textAlign='center'>
                      <img id="subway_bullet" src={`/PNGBullets/240px-NYCS-bull-trans-${line.name}.png`} />
                    </Header>
                  </Table.Cell>
                  <Table.Cell singleLine>{lineDelayed ? "Delayed" : "Seems OK"}</Table.Cell>                  
                  <Table.Cell singleLine>{line.last15}</Table.Cell>
                  <Table.Cell singleLine>{line.last30}</Table.Cell>
                  <Table.Cell singleLine>{line.lastHour}</Table.Cell>
                  <Table.Cell>
                    Placeholder Text
                  </Table.Cell>
                </Table.Row>
              )})}
            </Table.Body>
          </Table>
        </div>
      );
    } else {
      return(<div>loading...</div>);
    }
  }
}

const mapState = state => {
  console.log("state", state);
 return {
   status: state.status
 };
};

const mapDispatch = dispatch => {
  return {
    getStatuses: () => dispatch(getStatuses())
  };
};

export default connect(mapState, mapDispatch)(Status);