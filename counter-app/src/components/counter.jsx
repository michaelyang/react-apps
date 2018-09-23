import React, { Component } from 'react';

class Counter extends Component {

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? 'Zero' : value;
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    return classes += this.props.counter.value === 0 ? 'warning' : 'primary';
  }

  render() {
    return (
      <div>
        <h4>Counter #{this.props.counter.id}</h4>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button onClick={() => this.props.onIncrement(this.props.counter)} className="btn btn-secondary btn-sm">Increment</button>
        <button onClick={() => this.props.onDelete(this.props.counter.id)} className="btn btn-danger btn-sm m-2">Delete</button>
      </div>
    );
  }
}

export default Counter;