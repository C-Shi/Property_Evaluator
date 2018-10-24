import React, {Component} from 'react';
import Chart from './Chart';
import "../style/propertyCard.css";

class Property extends Component {

    render() {
      let crimeTotal = 0;
      for (var key in this.props.location.crime) {
        crimeTotal += this.props.location.crime[key];
      }

    return (
        <div className="card neighbor-info">
          <div className="card-body">

              <h5 className="card-header">{this.props.location.address} - {this.props.location.comm_name}</h5>

              <table className="table table-bordered">

                <thead>
                  <tr>
                      <th>Year </th>
                      <th>2017</th>
                      <th>2016</th>
                      <th>2015</th>
                      <th>2014</th>
                      <th>2013</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <th>Population <button className="btn btn-danger">Show</button></th>
                      {this.props.location.comm_population.map(each => {
                      return (
                        <td>{each.population}</td>
                      )
                      })}
                  </tr>

                  <tr>
                      <th>Recorded Crime <button className="btn btn-danger">Show</button></th>
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