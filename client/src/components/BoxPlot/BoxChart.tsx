import "./BoxChart.scss"
// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';
import {IBoxDataPoints} from "../../model/IBoxDataPoints";


export default function BoxChart(props: {
    chartTitle: string,
    dataPoints: IBoxDataPoints,
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
            title: props.xAxisName
        },
        data: [
            {
                type: "boxAndWhisker",
                dataPoints: [
                    props.dataPoints.getBoxPlotData(props.dataPoints.x0, "0"),
                    props.dataPoints.getBoxPlotData(props.dataPoints.x2, "2"),
                    props.dataPoints.getBoxPlotData(props.dataPoints.x4, "4"),
                    props.dataPoints.getBoxPlotData(props.dataPoints.x6, "6+"),
                ]
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
