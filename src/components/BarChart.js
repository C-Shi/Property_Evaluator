import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

class BarChart extends Component{
    render(){
        return (
            <div id="bar-chart" className="hidden">
            <Bar
                data={this.props.propertyValues}
                options={{
                  title: {
                    display: true,
                    text: 'Property Value Comparison',
                    fontSize: 25
                  },
                  legend: {
                    display: true,
                    position: 'right'
                  },
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero: true
                      }
                    }]
                  }
                }}
            />
        </div>
        )
    }


}

export default BarChart;