import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Search from './Search';
import Branch from './Branch';

const API_URL = "http://localhost:3030"

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchResults: [],
      branchIndices: '',
      branches: []
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleShowBranch = this.handleShowBranch.bind(this);
    this.handleTreeClick = this.handleTreeClick.bind(this);
  }

  componentDidMount(){
    axios.all([
      axios.get(`${API_URL}/trees`),
      axios.get(`${API_URL}/branches`)]).then(res =>
      
      this.setState({
        searchResults: res[0].data,
        branches : res[1].data
      
      })
    
    ).catch(error => console.log(error))

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

  handleTreeClick(e){
    
    this.setState({branchIndices: e.target.value})
  }

  handleShowBranch(e){
    console.log(e)
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

        {/*{categories}*/}

        <Search handleTreeClick={this.handleTreeClick} handleSearchChange={this.handleSearchChange} handleSearchSubmit={this.handleSearchSubmit} searchResults={this.state.searchResults}/>
        <Branch handleShowBranch={this.handleShowBranch}/>
      </div>
    );
  }
}


export default App;