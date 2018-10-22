import React, {Component} from 'react';
import Chart from './Chart';

class Property extends Component {

    render() {
      let crimeInfo = []
      for (var key in this.props.location.crime) {
        crimeInfo.push({type: key, count: this.props.location.crime[key]})
      }

      crimeInfo = crimeInfo.map(each => {
        return <li>{each.type} - {each.count}</li>
      })

      let priceInfo = this.props.location.value.map(each => {
        return <li>{each.year} - {each.price}</li>
      })

      let commPopulation = this.props.location.comm_population.map(each => {
        return <li>{each.year} - {each.population}</li>
      })
      return (
        <div className="card neighbor-info">
          <div className="card-body">
            <h5 className="card-title">{this.props.location.address}</h5>
            <ul>
              {priceInfo}
              {crimeInfo}
              {commPopulation}
              <li>Flooded Chance - {(this.props.location.flood)? 'Yes': 'No'}</li>
              <li>{this.props.location.lat}</li>
              <li>{this.props.location.lng}</li>
              <Chart location={this.props.location}/>
            </ul>
            <button className="btn btn-danger" onClick={() => {this.props.deleteProperty(this.props.location.address)}}>Delete</button>
          </div>
        </div>
      );
    }
  }


export default Property;