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
                           gridLines: {color: 'white'}
                           }],
                   yAxes: [
                       {
                       gridLines: { color: "white" },
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

export default LineChart;
