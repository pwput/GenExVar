import React, {SetStateAction} from 'react';
import "./ScatterChart.scss"
// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';
import { IData, IIsData} from "../../model/IGene";

export interface IAxisProps {
    name: string,
    suffix: string
}

export interface IClickableProps {
    canBeSelected: boolean
}

export interface TDottedChartProps {
    chartTitle: string,
    dataPoints: IData[],
    xAxisProps: IAxisProps,
    yAxisProps: IAxisProps,
    tooltipContent: string,
    plotContainerHeight?: string,
    isZoomEnabled?: boolean
    clickableProps?: IClickableProps
}

const chartTitleFontSize = 36;
const axisTitleFontSize = 24;
const labelFontSize = 16;

export default function ScatterChart(props: TDottedChartProps) {
    const isZoomEnabled = props.isZoomEnabled !== undefined ? props.isZoomEnabled : false
    const isClickable = props.clickableProps !== undefined ? props.clickableProps : false
    const plotContainerHeight = props.plotContainerHeight !== undefined ? props.plotContainerHeight : '100%'

    const [state, setState] = React.useState(false)

    const handleDivClick = (event: any) => {
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
            horizontalAlign: "center", // left, center ,right
            verticalAlign: "bottom",  // top, center, bottom
        },
        title: {
            titleFontSize: chartTitleFontSize,
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
        data: [{
            color: "red",
            showInLegend: true,
            type: "scatter",
            markerSize: 4,
            toolTipContent: props.tooltipContent,
            dataPoints: props.dataPoints
        }]
    }

    const containerProps = {
        height: plotContainerHeight
    };

    return (
        <div
            style={{borderColor: state ? "blue" : "lightgrey"}}
            className={"chart-container"}
            onClick={isClickable ? handleDivClick : ((any) => {
            })}>
            <CanvasJSReact.CanvasJSChart containerProps={containerProps} options={options}/>
        </div>
    );
}
