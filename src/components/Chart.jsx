import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class Chart extends Component{
    render(){
        return (
            <div className="chart">
            <Bar
                data={this.props.location.chartData}
                width={100}
                height={50}
                options={{
                  title: {
                    display: true,
                    text: 'Property Value at ' + this.props.location.address,
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

            <Line
                data={this.props.location.chartData}
                width={100}
                height={50}
                options={{
                  title: {
                    display: true,
                    text: 'Population Change at '+ this.props.location.address,
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

export default Chart;