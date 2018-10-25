import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

class BarChart extends Component{
    render(){
        return (
            <div id="bar-chart">
            <Bar
                data={this.props.propertyValues}
                options={{
                  title: {
                    display: true,
                    text: 'Property Value Comparison',
                    fontSize: 25,
                    fontColor: 'black'
                  },
                  legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        fontColor: "black",
                        fontSize: 18
                    }
                  },
                  scales: {
                      yAxes: [{
                          ticks: {
                            fontColor: "black",
                            fontSize: 18,
                            stepSize: 1,
                            beginAtZero:true
                          }
                      }]
                  }
                  }
                }
            />
        </div>
        )
    }


}

export default BarChart;