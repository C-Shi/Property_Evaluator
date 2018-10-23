import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

class LineChart extends Component{
    render(){
        return (
            <div style={{width: '500px'}} className="line-chart">
            <Line
                data={this.props.location.populationData}
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
                }}
            />
            </div>
        )
    }


}

export default LineChart;