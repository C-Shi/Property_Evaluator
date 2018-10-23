import React, {Component} from 'react';
import LineChart from './LineChart';

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
            <h5 className="card-title">{this.props.location.address}</h5>
            <ul>
              {priceInfo}
              {crimeInfo}
              {populationInfo}
              <li>{this.props.location.lat}</li>
              <li>{this.props.location.lng}</li>
              <LineChart location={this.props.location}/>
            </ul>
            <button className="btn btn-danger" onClick={() => {this.props.deleteProperty(this.props.location.address)}}>Delete</button>
          </div>
        <div className="card">
        <h5 className="card-header">{this.props.location.address} - {this.props.location.comm_name}</h5>

        <div className="card-body">
              <th>Walkability Score : </th>

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
                <th>Flood</th>
                <td colspan="5">{this.props.location.flood? "True":"False"}</td>

            </tr>

            <tr>
                <th>Crime</th>
                <td colspan="5">{sumCrime} <br/>
                <button className="btn btn-danger">Show</button>
                </td>

            </tr>
        </tbody>
        </table>
        </div>
        </div>
      );
    }
  }
export default Property;
