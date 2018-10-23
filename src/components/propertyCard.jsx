import React, {Component} from 'react';

class PropertyCard extends Component {

  render() {

    console.log(Object.keys(this.props.location.crime));

    let crimeTotal = 0;
    for (var key in this.props.location.crime) {
      crimeTotal += this.props.location.crime[key];
    }

    return (
      <div className="card">
        <h5 className="card-header">{this.props.location.address} - {this.props.location.comm_name}</h5>

        <div className="card-body">
          <p>Walkability Score: </p>

          <div>
            <p>Flood: {this.props.location.flood ? 'true' : 'false'}</p>
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
                <td>{crimeTotal}</td>
            </tr>

          </tbody>
        </table>
      </div>
    )
  }
}

export default PropertyCard;
