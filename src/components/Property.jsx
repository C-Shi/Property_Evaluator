import React, {Component} from 'react';
import Chart from './Chart';
import "../style/propertyCard.css";

class Property extends Component {

    render() {
      let crimeTotal = 0;
      for (var key in this.props.location.crime) {
        crimeTotal += this.props.location.crime[key];
      }

      const lastYearPropertyValue = this.props.location.comm_population[this.props.location.comm_population.length - 1];

    return (
        <div className="card neighbor-info">
          <div className="card-body">

              <h5 className="card-header">{this.props.location.address} - {this.props.location.comm_name}</h5>

              <table className="table table-bordered">

                <thead>
                  <tr>
                      <th>Year </th>
                      <th>2017</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <th>Population</th>
                    <td>{lastYearPropertyValue.population}</td>
                  </tr>

                  <tr>
                      <th>Recorded Crime</th>
                      <td colSpan="5">{crimeTotal}</td>
                  </tr>
                  <tr>
                    <th>Walkability Score:</th>
                    <td colSpan="5">Score</td>
                  </tr>
                  <tr>
                    <th>Flood Risk:</th>
                    <td colSpan="5">{this.props.location.flood ? 'true' : 'false'}</td>
                  </tr>
                </tbody>
              </table>

              <i className="fa fa-times fa-2x delete" aria-hidden="true" onClick={() => {this.props.deleteProperty(this.props.location.address)}}></i>
          </div>
        </div>
      );
    }
  }
export default Property;

// <button className="btn btn-danger">Show</button>
//
// <Chart location={this.props.location}/>
