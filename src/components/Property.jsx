import React, {Component} from 'react';

class Property extends Component {

    render() {
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
      return (
        <div className="card neighbor-info">
          <div className="card-body">
            <h5 className="card-title">{this.props.location.address}</h5>
            <ul>
              {priceInfo}
              {crimeInfo}
              <li>{this.props.location.lat}</li>
              <li>{this.props.location.lng}</li>
            </ul>
            <button className="btn btn-danger" onClick={() => {this.props.deleteProperty(this.props.location.address)}}>Delete</button>
          </div>
        </div>
      );
    }
  }


export default Property;