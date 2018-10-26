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
                    fontSize: 25,
                    fontColor:'white'
                  },
                  legend: {
                    display: true,
                    position: 'right'
                  },
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero: true,
                        fontColor:'white',
                        fontWeight:'bold'


                      }
                    }],
                    xAxes: [{
                      ticks: {
                        fontColor:'white',
                        fontWeight:'bold'



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