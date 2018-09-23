import React, { Component } from 'react';
import NavBar from './components/navbar'
import Counters from './components/counters'
import './App.css';


class App extends Component {
  state = {
    counters: [
      {id: 1, value: 0},
      {id: 2, value: 4},
      {id: 3, value: 2},
      {id: 4, value: 1},
    ]
  };

  constructor() {
    super();
    console.log('app - constructed')
  }

  componentDidMount() {
    // Ajax fetchall
    console.log('app - mounted')
  }

  handleDelete = counterId => {
    const counters = this.state.counters.filter(c => c.id !== counterId);
    this.setState({counters});
  };

  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({counters});
  }

  handleIncrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = {...counter}
    counters[index].value++;
    this.setState({counters});
  };

  render() {
    console.log('app - render')
    return (
      <React.Fragment>
        <NavBar totalCounters={this.state.counters.filter(c => c.value > 0).length}/>
        <main className="container">
          <Counters
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDelete={this.handleDelete}
            counters = {this.state.counters}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
