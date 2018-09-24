import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {getStatuses} from '../store'


class Status extends Component {
  constructor() {
    super();
  };

  async componentDidMount(){
    await this.props.getStatuses();
    console.log("props dot status", this.props.status);
  }

  render(){
    return(
    <ul>
      {this.props.status[0] ? this.props.status.map(line => <li key={line.id}>{line.name}</li>) : <div>loading...</div>}
    </ul>
    );
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