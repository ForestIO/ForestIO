import React, { Component } from 'react';

class Search extends Component {

    render() {


        // const treeSearchHandler = this.props.treeSearchHandler;
        const searchResults = this.props.searchResults;

        let resultsArray = [];
        for (let i = 0; i < searchResults.length; i++) {
            let searchstyler = [{ "background": "rgba(0,0,0,0.2)" }, { "background": "rgba(0,0,0,0.0)" }]
            resultsArray.push(
                <div style={searchstyler[i % 2]} id={searchResults[i]._id} key={i} className="searchresult">
                  <button 
                  value = {searchResults[i].name} 
                  onClick = {this.props.handleTreeClick} 
                  type = 'button'>{searchResults[i].name}
                  </button>
              
                </div>)
        }

        return (
            <div id="searchcontainer">
                <form onSubmit={this.props.handleSearchSubmit}>
                    <label>
                        Tree Name:
            <input type="text" onChange={this.props.handleSearchChange} />
                    </label>
                </form>
                {resultsArray}
            </div>
        )
    }
}

export default Search;
