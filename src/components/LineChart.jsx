import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

class LineChart extends Component{
   render(){
       return (
           <div style={{width: '100%'}}>
           <Line
               data={this.props.population}
               options={{
                 title: {
                   display: true,
                   text: 'Community Population Trend',
                   fontSize: 25,
                   fontColor: 'white'
                 },
                 legend: {
                   display: true,
                   position: 'bottom',
                   labels: {
                       fontColor:'white'
                   }
                 },
                 layout: {
                    padding: {
                        top: 10,
                        left: 50,
                        right: 50,
                        bottom: 10,
                    }
                 },
                 scales: {
                   xAxes: [
                           {
                           ticks: {
                           fontColor: "white",
                           },
                           gridLines: {color: 'white'}
                           }],
                   yAxes: [
                       {
                       gridLines: { color: "white" },
                       ticks: {
                           fontColor: 'white',
                       }}]
                 }
               }}
           />
           </div>
       )
   }


}

export default LineChart;
