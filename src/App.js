import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

const API_URL = "http://localhost:3030/trees"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
      branches: []
    }
  }

  componentDidMount(){
    axios.get(`${API_URL}`).then(res =>
      
      this.setState({
        searchResults: res.data
      
      })
    
    ).catch(error => console.log(error))
  }

  render() {
    console.log(this.state.searchResults)
    let categories = this.state.searchResults.map(elem => <button  type = "button">{elem.name}</button>)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        {categories}
      </div>
    );
  }
}

export default App;