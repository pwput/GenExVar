import "./BoxChart.scss"
// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';
import {BoxDataPoints} from "../../model/BoxDataPoints";


export default function BoxChart(props: {
    chartTitle: string,
    dataPoints: BoxDataPoints,
    xAxisName: string, yAxisName: string,
    plotContainerHeight: string,
    yValueFormatString: string,

}) {
    const options = {
        theme: "light2",
        animationEnabled: true,
        title: {
            text: props.chartTitle
        },
        axisY: {
            title: props.yAxisName,
        },
        axisX: {
            title: props.xAxisName,
            maximum: 7,
            interval: 2
        },
        data: [
            {
                //[Minimum, Q1, Q3, Maximum, Q2]
                type: "boxAndWhisker",
                dataPoints: props.dataPoints.getBoxPlotData(),

            },
            {
                type: "scatter",
                markerSize: 4,
                color: "red",
                dataPoints: props.dataPoints.getScatterPlotData()
            },
        ]
    }

    const containerProps = {
        height: props.plotContainerHeight
    };

    return (
        <div className={"chart-container"}>
            <CanvasJSReact.CanvasJSChart containerProps={containerProps} options={options}
            />
        </div>
    );
}
