import React from 'react'
import ReactDOM from 'react-dom'
import Episode from './components/Episode'
import Search from './components/Search'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      season: 1,
      number: 1
    }
    this._setEpisode = this._setEpisode.bind(this);
  }

  _setEpisode(event) {
    this.setState({
      season: event.target.dataset.season,
      number: event.target.dataset.number
    });
  }

  render() {
    return (
      <div className="container">
        <div className="flex-row flex-center flex-sm-column header">
          <div className="col">
            <div className="logo">STAR TREK<br/>EPISODES</div>
          </div>
          <div className="col">
            <Search _setEpisode={this._setEpisode.bind(this)} />
          </div>
        </div>
        <Episode season={this.state.season} number={this.state.number} />
      </div>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('app'))
