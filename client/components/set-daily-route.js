import React, {Component} from 'react';
import {Form, Grid, Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {getStatuses} from '../store';
import axios from 'axios';

class SetRoute extends Component {
  constructor() {
    super();
    this.state = {
      lineTo: null,
      lineFrom: null,
      sameLine: true,
      timeTo: null,
      timeFrom: null,
      days: {su: false, mo: true, tu: true, we: true, th: true, fr: true, sa: false },

    };
    this.handleSameLine = this.handleSameLine.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLineTo = this.handleLineTo.bind(this);
    this.handleLineFrom = this.handleLineFrom.bind(this);
    this.handleTimeTo = this.handleTimeTo.bind(this);
    this.handleTimeFrom = this.handleTimeFrom.bind(this);
  }

  async componentDidMount() {
    if (!this.props.status[0]) await this.props.getStatuses();
  }

  handleSameLine(event, {value}) {
    this.setState({sameLine: value});
    console.log(this.state.value);
  }

  handleLineTo(event) {
    const lineName = event.target.innerText;
    if (this.state.sameLine) {
      this.setState({lineTo: lineName, lineFrom: lineName});
    } else {
      this.setState({lineTo: lineName});
    }
  }

  handleLineFrom(event) {
    const lineName = event.target.innerText;
    this.setState({lineFrom: lineName});
  }

  handleTimeTo(value) {
    this.setState({timeTo: value});
    // console.log("this.state", this.state);
  }

  handleTimeFrom(value) {
    this.setState({timeFrom: value});
    // console.log("this.state", this.state);
  }

  async handleSubmit(event) {
    console.log('this.state', this.state);
    event.preventDefault();
    const daysArr = [];
    for(const day in this.state.days){
      if(this.state.days[day]) daysArr.push(day);
    }
    console.log("daysArr", daysArr);
    await axios.put(`/api/users/`, {
      lineTo: this.state.lineTo,
      lineFrom: this.state.lineFrom,
      timeTo: this.state.timeTo,
      timeFrom: this.state.timeFrom,
      days: this.state.days
    });
  }

  render() {
    let times = [
      {key: 0, text: '12-1am', value: 0},
      {key: 1, text: '1-2am', value: 1},
      {key: 2, text: '2-3am', value: 2},
      {key: 3, text: '3-4am', value: 3},
      {key: 4, text: '4-5am', value: 4},
      {key: 5, text: '5-6am', value: 5},
      {key: 6, text: '6-7am', value: 6},
      {key: 7, text: '7-8am', value: 7},
      {key: 8, text: '8-9am', value: 8},
      {key: 9, text: '9-10am', value: 9},
      {key: 10, text: '10-11am', value: 10},
      {key: 11, text: '11am-12pm', value: 11},
      {key: 12, text: '12-1pm', value: 12},
      {key: 13, text: '1-2pm', value: 13},
      {key: 14, text: '2-3pm', value: 14},
      {key: 15, text: '3-4pm', value: 15},
      {key: 16, text: '4-5pm', value: 16},
      {key: 17, text: '5-6pm', value: 17},
      {key: 18, text: '6-7pm', value: 18},
      {key: 19, text: '7-8pm', value: 19},
      {key: 20, text: '8-9pm', value: 20},
      {key: 21, text: '9-10pm', value: 21},
      {key: 22, text: '10-11pm', value: 22},
      {key: 23, text: '11pm-12am', value: 23}
    ];
    let lineNames = [];
    if (this.props.status[0]) {
      this.props.status.forEach(line =>
        lineNames.push({key: line.name, text: line.name, value: line.name})
      );
      lineNames.sort((a, b) => a.name < b.name);
      return (
        <Grid>
          <Grid.Column width={4}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group widths="equal">
                <Form.Radio
                  label="I take the same line to and from work"
                  value={true}
                  checked={this.state.sameLine}
                  onChange={this.handleSameLine}
                />
                <Form.Radio
                  label="I take different lines to and from work"
                  value={false}
                  checked={!this.state.sameLine}
                  onChange={this.handleSameLine}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Select
                  fluid
                  label="Line to Work"
                  options={lineNames}
                  placeholder="Line to Work"
                  onChange={this.handleLineTo}
                />
                {!this.state.sameLine ? (
                  <Form.Select
                    fluid
                    label="Line from Work"
                    options={lineNames}
                    placeholder="Line from Work"
                    onChange={this.handleLineFrom}
                  />
                ) : (
                  <div />
                )}
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Select
                  fluid
                  label="Time to Work"
                  options={times}
                  placeholder="Morning Commute Time"
                  onChange={(event, {value}) => this.handleTimeTo(value)}
                />
                <Form.Select
                  fluid
                  label="Time from Work"
                  options={times}
                  placeholder="Evening Commute Time"
                  onChange={(event, {value}) => this.handleTimeFrom(value)}
                />
              </Form.Group>
              <h5>Days Traveled</h5>
              <Form.Group>
                <Button type="button" circular active={this.state.days.mo} color={this.state.days.mo ? 'blue' : null} onClick={() => this.setState({days: {...this.state.days, mo: !this.state.days.mo}})}>Mo</Button>
                <Button type="button" circular active ={this.state.days.tu} color={this.state.days.tu ? 'blue' : null} onClick={() => this.setState({days: {...this.state.days, tu: !this.state.days.tu}})}>Tu</Button>
                <Button type="button" circular active ={this.state.days.we} color={this.state.days.we ? 'blue' : null} onClick={() => this.setState({days: {...this.state.days, we: !this.state.days.we}})}>We</Button>
                <Button type="button" circular active ={this.state.days.th} color={this.state.days.th ? 'blue' : null} onClick={() => this.setState({days: {...this.state.days, th: !this.state.days.th}})}>Th</Button>
                <Button type="button" circular active ={this.state.days.fr} color={this.state.days.fr ? 'blue' : null} onClick={() => this.setState({days: {...this.state.days, fr: !this.state.days.fr}})}>Fr</Button>
                <Button type="button" circular active ={this.state.days.sa} color={this.state.days.sa ? 'blue' : null} onClick={() => this.setState({days: {...this.state.days, sa: !this.state.days.sa}})}>Sa</Button>
                <Button type="button" circular active ={this.state.days.su} color={this.state.days.su ? 'blue' : null} onClick={() => this.setState({days: {...this.state.days, su: !this.state.days.su}})}>Su</Button>
              </Form.Group>
              <Form.Button>Submit</Form.Button>
            </Form>
          </Grid.Column>
        </Grid>
      );
    } else {
      return <div>loading...</div>;
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
