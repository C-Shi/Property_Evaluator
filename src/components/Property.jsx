import React, {Component} from 'react';
import Chart from './Chart';
import "../style/propertyCard.css";

class Property extends Component {

    render() {
      let crimeTotal = 0;
      for (var key in this.props.location.crime) {
        crimeTotal += this.props.location.crime[key];
      }
      const lastYearPopulationValue = this.props.location.comm_population[this.props.location.comm_population.length - 1];

      let lasteyearpriceInfo = this.props.location.value[this.props.location.value.length-5].price;
    return (
        <div className="card neighbor-info">
          <div className="card-body">
              <h5 className="card-header">{this.props.location.address} - {this.props.location.comm_name}
              <button className="fa fa-times fa-2x" onClick={() => {this.props.deleteProperty(this.props.location.address)}}></button>
              </h5>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Year </th>
                    <th>2018</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Population</th>
                    <td>{lastYearPopulationValue.population}</td>
                  </tr>
                  <tr>
                    <th>Property</th>
                    <td>{lasteyearpriceInfo}</td>
                  </tr>
                  <tr>
                    <th>Recorded Crime</th>
                    <td colSpan="5">{crimeTotal}</td>
                  </tr>
                  <tr>
                    <th>Walkability Score</th>
                    <td colSpan="5"></td>
                  </tr>
                  <tr>
                    <th>Flood Risk</th>
                    <td colSpan="5">{this.props.location.flood ? 'true' : 'false'}</td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
      );
    }
  }
export default Property;

// <button className="btn btn-danger">Show</button>
//
// <Chart location={this.props.location}/>
// <button className="btn btn-danger" onClick={() => {this.props.deleteProperty(this.props.location.address)}}>Delete</button>