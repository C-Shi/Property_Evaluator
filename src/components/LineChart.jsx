import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

class LineChart extends Component{
    render(){
        return (
            <div style={{width: '500px'}} className="line-chart">
            <Line
                data={this.props.population}
                options={{
                  title: {
                    display: true,
                    text: 'Community Population',
                    fontSize: 20,
                    fontColor: 'black'
                  },
                  legend: {
                    display: true,
                    position: 'right',
                    borderColor: 'black'
                  }
                }}
            />
            </div>
        )
    }


}

export default LineChart;