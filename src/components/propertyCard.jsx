import React, {Component} from 'react';

class PropertyCard extends Component {
  render() {
    return (
      <div className="card">
      <h5 className="card-header">{this.props.location.address} - {this.props.location.comm_name}</h5>

      <div className="card-body">
            <th>Walkability Score: </th>

          <div>
            <th>Flood: </th>
            <td> {this.props.location.flood ? 'true' : 'false'}</td>
            </div>


       </div>

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
            <th>Population</th>
              {this.props.location.comm_population.map(each => {
              return (
                <td>{each.population}</td>
              )
              })}
          </tr>
          <tr>
              <th>Crime</th>
                {this.props.location.comm_population.map(each => {
                return (
                  <td>{each.crime}</td>
                )
                })}
          </tr>

      </tbody>
      </table>
      </div>
    )
  }
}

export default PropertyCard;
