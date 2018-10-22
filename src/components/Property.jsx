import React, {Component} from 'react';

class Property extends Component {

    render() {
      console.log(this.props.location)
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
            </ul>
          </div>
        <div class="card">
        <h5 class="card-header">{this.props.location.address} - {this.props.location.comm_name}</h5>

        <div class="card-body">
              <th>Walkability Score : </th>

         </div>

        <table class="table table-bordered">
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
                <td>Row 2 Cell 1</td>
                <td>Row 2 Cell 2</td>
                <td>Row 2 Cell 3</td>
                <td>Row 2 Cell 4</td>
                <td>Row 2 Cell 5</td>
            </tr>

            <tr>
                <th>Flood</th>
                <td>Row 3 Cell 1</td>
                <td>Row 3 Cell 2</td>
                <td>Row 3 Cell 3</td>
                <td>Row 3 Cell 4</td>
                <td>Row 3 Cell 5</td>
            </tr>
        </tbody>
        </table>
        </div>
        </div>
      );
    }
  }
export default Property;