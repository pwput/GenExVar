import React from 'react';
import "./ScatterChart.scss"
// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';
import {DataPointColored} from "../../domain/DataPointColored";
import {getDataWithLegend} from "../../domain/ChartDataWithLegend";

export type AxisProps = {
    name: string
    suffix: string
}

export type IClickableProps = {
    canBeSelected: boolean
}

export type ScatterChartProps = {
    chartTitle: string,
    dataPoints: DataPointColored[],
    xAxisProps: AxisProps,
    yAxisProps: AxisProps,
    tooltipContent: string,
    plotContainerHeight?: string,
    isZoomEnabled?: boolean
    clickableProps?: IClickableProps
}

const chartTitleFontSize = 36;
const axisTitleFontSize = 24;
const labelFontSize = 16;

export default function ScatterChart(props: ScatterChartProps) {
    const isZoomEnabled = props.isZoomEnabled !== undefined ? props.isZoomEnabled : false
    const isClickable = props.clickableProps !== undefined ? props.clickableProps : false
    const plotContainerHeight = props.plotContainerHeight !== undefined ? props.plotContainerHeight : '100%'

    const [state, setState] = React.useState(false)

    const handleDivClick = () => {
        if (props.clickableProps !== undefined) {
            if (!state && !props.clickableProps.canBeSelected)
                return
            setState(!state)
        }
    }

    const options = {
        theme: "light2",
        animationEnabled: true,
        zoomEnabled: isZoomEnabled,
        legend:{
            fontSize: labelFontSize,
            horizontalAlign: "right", // left, center ,right
            verticalAlign: "bottom",  // top, center, bottom
        },
        title: {
            fontSize: chartTitleFontSize,
            text: props.chartTitle
        },
        axisX: {
            titleFontSize: axisTitleFontSize,
            labelFontSize: labelFontSize,
            title: props.xAxisProps.name,
            suffix: props.xAxisProps.suffix,
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        axisY: {
            titleFontSize: axisTitleFontSize,
            labelFontSize: labelFontSize,
            title: props.yAxisProps.name,
            suffix: props.yAxisProps.suffix,
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        data:  getDataWithLegend(props.dataPoints, props.tooltipContent)
    }

    const containerProps = {
        height: plotContainerHeight
    };

    return (
        <div
            style={{borderColor: state ? "blue" : "lightgrey"}}
            className={"chart-container"}
            onClick={isClickable ? handleDivClick : (() => {
            })}>
            <CanvasJSReact.CanvasJSChart containerProps={containerProps} options={options}/>
        </div>
    );
}
