import React, {Component} from 'react';

class NeighborInfo extends Component {

    render() {
      let crimeInfo = []
      for (var key in this.props.location.crime) {
        crimeInfo.push({type: key, count: this.props.location.crime[key]})
      }

      crimeInfo = crimeInfo.map(each => {
        return <li>{each.type} - {each.count}</li>
      })
      return (
        <div className="card neighbor-info">
          <div className="card-body">
            <h5 className="card-title">{this.props.location.address}</h5>
            <ul>
              <li>{this.props.location.value[0].price}</li>
              {crimeInfo}
            </ul>
          </div>
        </div>
      );
    }
  }


export default NeighborInfo;