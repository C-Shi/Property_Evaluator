import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

class LineChart extends Component{
    render(){
        return (
            <div className="line-chart">
            <Line
                data={this.props.location.populationData}
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

export default LineChart;