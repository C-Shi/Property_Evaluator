import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

class BarChart extends Component{
   render(){
       return (
           <div style={{width: '100%'}}>
           <Bar
               data={this.props.propertyValues}
               options={{
                   title: {
                   display: true,
                   text: 'Property Value Over Years',
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
                           gridLines: {color: 'rgba(105, 105, 105, 0.5)'}
                           }],
                   yAxes: [
                       {
                       gridLines: {color: 'rgba(105, 105, 105, 0.5)'},
                       ticks: {
                           fontColor: 'white',
                           callback: function(value, index, values) {
                                return String(value/1000) + 'K'
                           }
                       }}]
                 }
               }}
           />
       </div>
       )
   }


}

export default BarChart;
