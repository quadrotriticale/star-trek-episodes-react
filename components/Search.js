import React from 'react';

const data = require('./data.json');

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      episodes: [],
      results: []
    }
  }

  componentDidMount() {
    this.setState({episodes: data.episodes});
  }

  _handleChange(event) {
    this.setState({inputValue: event.target.value});
    if (this.state.inputValue.length > 2)
      this._findMatches(this.state.inputValue);
    else {
      if (this.state.results.length > 0)
        this.setState({results: []});
    }
  }

  _findMatches(inputString) {
    let matches = this.state.episodes.filter(episode => {
      return episode.name.toLowerCase().indexOf(inputString.toLowerCase()) > -1;
    });
    this.setState({results: matches})
  }

  _handleClick(event) {
    this.setState({inputValue: '', results: []});
    this.props._setEpisode(event);
  }


  render() {
    let results = null;
    if (this.state.results.length > 0) {
      results = (
        <ul className="results">
          {this.state.results.map(function(item, index) {
            return <li key={index} onClick={this._handleClick.bind(this)} data-season={item.season} data-number={item.number}>{item.name} <span className="small">{item.season}x{item.number < 10 ? '0'+item.number : item.number}</span></li>;
          }, this)}
        </ul>
      )
    }

    return (
      <div>
        <input type="text" onChange={this._handleChange.bind(this)} placeholder="Episode title..." value={this.state.inputValue} />
        {results}
      </div>
    )
  }

}

export default Search
