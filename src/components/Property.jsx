import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';
import "../style/propertyCard.css";

class Property extends Component {
    componentDidMount(){
      window.$("#crime-breakdown").click(() => {
        window.$(`.pie-chart[data-id='${this.props.location.address}']`).toggle()
      })
    }

    render() {
      let crimeTotal = 0;
      for (var key in this.props.location.crime) {
        crimeTotal += this.props.location.crime[key];
      }
      const lastYearPopulationValue = this.props.location.comm_population[0].population;
      let lastYearPriceInfo = this.props.location.value[0].price;

    return (
        <div className="card neighbor-info" key={this.props.location.address}>
          <div className="card-body" data-scroll={this.props.location.address}>
              <div className="card-header">
                <button className="fa fa-times fa-2x" onClick={() => {this.props.deleteProperty(this.props.location.address)}}></button>
                <h5 className="text-left"><strong>Address:</strong> {this.props.location.address}</h5>
                <h5 className="text-left"><strong>Community:</strong> {this.props.location.comm_name}</h5>
              </div>

              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Year </th>
                    <th>2018</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Population <small>(people)</small></th>
                    <td>{lastYearPopulationValue}</td>
                  </tr>
                  <tr>
                    <th>Property Value <small>(K) </small></th>
                    <td>{lastYearPriceInfo/1000}</td>
                  </tr>
                  <tr>
                    <th id="crime-breakdown">Crime Rate <i className="fa fa-caret-down" aria-hidden="true"></i> <small>(case/person)</small></th>
                    <td>{String((crimeTotal/Number(lastYearPopulationValue)).toFixed(2))}</td>
                  </tr>
                  <tr>
                    <td colSpan='2' className="pie-chart" data-id={this.props.location.address} style={{display: "none"}}>
                    <Pie
                        data={this.props.location.pieData}
                        width={100}
                        height={55}
                        options={{
                          title: {
                            display: true,
                            fontSize: 20
                          },
                          legend: {
                            display: true,
                            position: 'right',
                            labels: {
                              fontColor: "#fff",
                            }
                          },
                        }}
                    />
                    </td>
                  </tr>
                  <tr>
                    <th>Walkability Score</th>
                    <td>
                      {this.props.location.walkScore.score || 'N/A'}
                      <small> {this.props.location.walkScore.description || 'N/A'}</small>
                    </td>
                  </tr>
                  <tr>
                    <th>Transit Score</th>
                    <td>
                      {this.props.location.transitScore.score || 'N/A'}
                      <small> {this.props.location.transitScore.description || 'N/A'}</small>
                    </td>
                  </tr>
                  <tr>
                    <th>Flood Risk</th>
                    <td style={{color: 'red'}}>{this.props.location.flood ? 'High Risk' : 'N/A'}</td>
                  </tr>
                </tbody>
              </table>
              <div className="neighbor-between"> </div>
          </div>
        </div>
      );
    }
  }
export default Property;
