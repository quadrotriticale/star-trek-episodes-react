import React from 'react';
import axios from 'axios';

class Episode extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      season: props.season,
      number: props.number,
      name: '',
      summary: '',
      image: 'MissingImageB.png'
    };
    this._getEpisodeData = this._getEpisodeData.bind(this);
  }

  componentDidMount() {

    this._getEpisodeData(this.props.season, this.props.number);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.number !== this.state.number && nextProps.season !== this.state.season) {
      this.setState({ season: nextProps.season, number: nextProps.number }, () => {
        this._getEpisodeData(this.props.season, this.props.number);
      });
    }
  }

  _getEpisodeData(season, number) {

    axios.get('http://api.tvmaze.com/shows/492/episodebynumber?season=' + season + '&number=' + number)
    .then(response => {

      const data = response.data;
      const regex = /<\/*\w+>/gi;
      let summaryString = data.summary ? data.summary.replace(regex, ' ') : 'Summary not available for this episode';
      let imageUrl = data.image ? data.image.medium : 'MissingImageB.png';

      this.setState({
        name: data.name,
        season: data.season,
        number: data.number,
        summary: summaryString,
        image: imageUrl
      });

    })

  }

  render() {
    return (
      <div className="flex-row flex-center flex-sm-column episode">
        <div className="col col-image">
          <img className="img-responsive" src={this.state.image}/>
        </div>
        <div className="col col-details">
          <h1>{this.state.name}</h1>
          <p>SEASON {this.state.season} EPISODE {this.state.number}</p>
          <p>{this.state.summary}</p>
        </div>
      </div>
    );
  }

}

export default Episode
