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
                   fontColor: 'white'
                 },
                 legend: {
                   display: true,
                   position: 'right',
                   labels: {
                       fontColor:'white'
                   }
                 },
                 scales: {
                   xAxes: [
                           {
                           ticks: {
                           fontColor: "white",
                           },
                           gridLines: {color: 'rgba(105, 105, 105, 0.5)'}
                           }],
                   yAxes: [
                       {
                       gridLines: {color: 'rgba(105, 105, 105, 0.5)'},
                       ticks: {
                           fontColor: 'white'
                       }}]
                 }
               }}
           />
       </div>
       )
   }


}

export default BarChart;
