import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Search from './Search';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchResults: [],
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchChange(e) {
    this.setState({ searchText: e.target.value });
  }

  handleSearchSubmit(e) {
    e.preventDefault();

    axios.post('http://localhost:3000/', { treeQuery: this.state.searchText })
      .then(res => {
        this.setState({ searchResults: res.data })
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload fghsdkhf.
        </p>
        <Search handleSearchChange={this.handleSearchChange} handleSearchSubmit={this.handleSearchSubmit} searchResults={this.state.searchResults}/>
      </div>
    );
  }
}

export default App;
