import React, {Component} from 'react';
import {Form} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {getStatuses} from '../store';


class SetRoute extends Component {
  constructor(){
    super();
    this.state = {
      lineTo: null,
      lineFrom: null,
      sameLine: true,
      timeTo: null,
      timeFrom: null,
      days: ['M', 'Tu', 'W', 'Th', 'Fr']
    };
    this.handleSameLine = this.handleSameLine.bind(this);
  }

  async componentDidMount (){
    if(!this.props.status[0]) await this.props.getStatuses();

  };

  handleSameLine(event, { value }) {
    this.setState({sameLine: value});
    console.log(this.state.value);
  }
  render() {
    let lineNames = [];
    if(this.props.status[0]) {
      this.props.status.forEach(line => lineNames.push({key: line.name, text: line.name, value: line.name}));
      return (
        <Form>
          <Form.Group widths='equal'>
            <Form.Select fluid label='Line to Work' options={lineNames} placeholder='Line to Work'/>
            <Form.Group widths='equal'>
              <Form.Radio label='I take the same line to and from work' value={true} checked={this.state.sameLine}  onChange={this.handleSameLine} />
              <Form.Radio label='I take different lines to and from work' value={false} checked={!this.state.sameLine} onChange={this.handleSameLine} />
            </Form.Group>
            {!this.state.sameLine ? <Form.Select fluid label='Line from Work' options={lineNames} placeholder='Line from Work'/> : <div /> }
          </Form.Group>
        </Form>
      );
    } else {
      return (<div>loading...</div>);
    }
  }
}

const mapState = state => ({
  status: state.status
});
const mapDispatch = dispatch => ({
  getStatuses: () => dispatch(getStatuses())
});

export default connect(mapState, mapDispatch)(SetRoute);
// options={lineNames}
//eyyyy