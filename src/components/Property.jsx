import React, {Component} from 'react';
import Chart from './Chart';
import "../style/propertyCard.css";

class Property extends Component {

    render() {
      let crimeTotal = 0;
      for (var key in this.props.location.crime) {
        crimeTotal += this.props.location.crime[key];
      }
      const lastYearPopulationValue = this.props.location.comm_population[0].population;
      let lastYearPriceInfo = this.props.location.value[0].price;
      lastYearPriceInfo = (lastYearPriceInfo > 1000000) ? lastYearPriceInfo/1000000 + 'M' : String(lastYearPriceInfo/1000) + 'K'
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
                    <td>{lastYearPopulationValue}</td>
                  </tr>
                  <tr>
                    <th>Property Value</th>
                    <td>{lastYearPriceInfo}</td>
                  </tr>
                  <tr>
                    <th>Crime Rate</th>
                    <td colSpan="5">{String((crimeTotal/Number(lastYearPopulationValue)).toFixed(2))} case/person</td>
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
