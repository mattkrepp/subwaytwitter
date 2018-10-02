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
    await this.props.getStatuses();
    // this.props.status = this.props.status.sort((lineA, lineB) => lineA.name < lineB.name);
  }

  render(){
    if(this.props.status[0]){
      const statuses = this.props.status.sort((lineA, lineB) => lineA.name > lineB.name);
      // return(
      //   this.props.status.map(line => <li key={line.id}>{line.name}</li>)
      // );
      return(
        (
          <Table celled padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell singleLine>Line Name</Table.HeaderCell>
                <Table.HeaderCell>Last 15 Minutes</Table.HeaderCell>
                <Table.HeaderCell>Last 30 Mintues</Table.HeaderCell>
                <Table.HeaderCell>Last Hour</Table.HeaderCell>
                <Table.HeaderCell>Official Service Advisories</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
        
            <Table.Body>
              {statuses.map(line => (
                <Table.Row key={line.name}>
                  <Table.Cell>
                    <Header as='h2' textAlign='center'>
                      {line.name}
                    </Header>
                  </Table.Cell>
                  <Table.Cell singleLine>{line.last15}</Table.Cell>
                  <Table.Cell singleLine>{line.last30}</Table.Cell>
                  <Table.Cell singleLine>{line.lastHour}</Table.Cell>
                  <Table.Cell>
                    Placeholder Text
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )
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