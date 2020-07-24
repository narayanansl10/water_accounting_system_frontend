import React, { Component } from "react";
import CanvasJSReact from './../canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class GraphRainfallComponent extends Component {
    render() {
        const options = {
            title: {
                text: "Water Need during no Rainfall Vs Water Need with Rainfall"
            },
            data: [{
                type: "spline",
                dataPoints: [
                    { label: "Jan", y: 10 },
                    { label: "Feb", y: 15 },
                    { label: "March", y: 25 },
                    { label: "Mango", y: 30 },
                    { label: "Grape", y: 28 }
                ]
            }, {
                type: "spline",
                dataPoints: [
                    { label: "Jan", y: 13 },
                    { label: "Feb", y: 20 },
                    { label: "March", y: 15 },
                    { label: "Mango", y: 10 },
                    { label: "Grape", y: 8 }
                ]
            }
            ]
        }

        return (
            <div>
                <CanvasJSChart options={options}
                /* onRef = {ref => this.chart = ref} */
                />
            </div >
        );
    }
}