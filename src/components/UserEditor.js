import React, {Component} from 'react';

export default class UserEditor extends Component {
  static getDerivedStateFromProps(props, state) {
    if (props.id === state.id) {
      return null;
    }
    return {icon: props.icon, id: props.id};
  }

  constructor() {
    super();

    this.handleOnClickUpdate = () => {
      this.props.onUpdate(this.state.icon);
    };

    this.handleOnChangeIcon = event => {
      this.setState({icon: event.target.value});
    }

    this.state = {icon: null};
  }

  render() {
    return (
      <div>
        <label>Icon URL: <input value={this.state.icon} onChange={this.handleOnChangeIcon} /></label>
        <button onClick={this.handleOnClickUpdate}>Update</button>
      </div>
    );
  }
}
