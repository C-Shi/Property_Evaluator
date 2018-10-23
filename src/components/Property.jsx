import React, {Component} from 'react';
import Chart from './Chart';
import PropertyCard from './propertyCard';

class Property extends Component {

    render() {
      let crimeInfo = []
      for (var key in this.props.location.crime) {
        crimeInfo.push({type: key, count: this.props.location.crime[key]})
      }

      const crimeInfoElement = crimeInfo.map(each => {
        return <li>{each.type} - {each.count}</li>
      })

      var sumCrime =0 ;
      for (var type of crimeInfo) {
        sumCrime += type["count"];
      }
        console.log("hello", sumCrime);
        console.log("flood",this.props.location.flood)

      let priceInfo = this.props.location.value.map(each => {
        return <li>{each.year} - {each.price}</li>
      })

      let populationInfo = this.props.location.comm_population.map(each => {
        return <li>{each.year} - {each.population}</li>
      })

    return (
        <div className="card neighbor-info">
          <div className="card-body">
            <PropertyCard location={this.props.location} />
            <Chart location={this.props.location}/>
            <button className="btn btn-danger" onClick={() => {this.props.deleteProperty(this.props.location.address)}}>Delete</button>
          </div>
        </div>
      );
    }
  }
export default Property;
