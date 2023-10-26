import "./BoxChart.scss"
// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';


export default function BoxChart(props: {
    chartTitle: string,
    dataPoints: { label: string, y: number[] }[],
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
        data: [{
            type: "boxAndWhisker",
            yValueFormatString: props.yValueFormatString,
            dataPoints: props.dataPoints
        }]
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
