import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Search from './Search';

const API_URL = "http://localhost:3030"

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchResults: [],
      treeClicked: '',
      branchIndices: [],
      branches: [],
      cachedTrees: [],
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleTreeClick = this.handleTreeClick.bind(this);
  }

  componentDidMount(){
    axios.all([
      axios.get(`${API_URL}/trees`),
      axios.get(`${API_URL}/branches`)]).then(res =>
      
      this.setState({
        searchResults: res[0].data,
      
      })
    
    ).catch(error => console.log(error))

  }

  componentDidMount() {
    axios.get('http://localhost:3030/trees')
      .then(res => {
        this.setState({ searchResults: res.data, cachedTrees: res.data })
      })
  }

  handleSearchChange(e) {

    this.setState({ searchText: e.target.value });
    const newSearchResults = this.state.cachedTrees.filter((ele) => {
      return ele.name.toLowerCase().includes(e.target.value.toLowerCase())
    })

    this.setState({ searchResults: newSearchResults })

  }

  handleSearchSubmit(e) {
    e.preventDefault();

    axios.get('http://localhost:3030/', { treeQuery: this.state.searchText })
      .then(res => {
        this.setState({ searchResults: res.data })
      });
  }

  handleTreeClick(e){
    
    this.setState({treeClicked: e.target.value})
    for(let i=0; i<this.state.searchResults.length; i++){
      if(this.state.searchResults[i].name === this.state.treeClicked){
        this.setState({branchIndices: this.state.searchResults[i].branches});
      };
    }
    //ex: axios.post('localhost:3030/findbranches',{ids:[1,2,3]}) -> Returns JSON with branches 1,2,3
    console.log('indexes', this.state.branchIndices)
    axios.post(`${API_URL}/findbranches`, {ids: this.state.branchIndices}).then(res=>
    {
      this.setState({branches: res.data})
    });
  }

 

  render() {
    console.log(this.state.searchResults)
    let categories = this.state.searchResults.map(elem => <button  type = "button">{elem.name}</button>)
    let branch = this.state.branches.map(elem => <div><h1>{elem.name}</h1> <p>{elem.desc}</p> </div>)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>ForestIO</h2>
        </div>

        <Search
          handleTreeClick={this.handleTreeClick}
          handleSearchChange={this.handleSearchChange}
          /*handleSearchSubmit={this.handleSearchSubmit}*/
          searchResults={this.state.searchResults}
        />
        {branch}
      
      </div>
    );
  }
}


export default App;