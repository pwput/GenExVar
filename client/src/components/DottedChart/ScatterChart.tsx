import React from 'react';
import "./ScatterChart.scss"
// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';
import {IData} from "../../model/IGene";

export interface IAxisProps {
    name: string,
    suffix: string
}

export interface IClickableProps {
    parentCallback: (data: boolean) => void
    checkIfCanBeSelected: () => boolean
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

export default function ScatterChart(props: TDottedChartProps) {
    const isZoomEnabled = props.isZoomEnabled !== undefined ? props.isZoomEnabled : false
    const isClickable = props.clickableProps !== undefined ? props.clickableProps : false
    const plotContainerHeight = props.plotContainerHeight !== undefined ? props.plotContainerHeight : '100%'

    const [state, setState] = React.useState(false)

    const handleDivClick = (event: any) => {
        if (props.clickableProps !== undefined) {
            if (!state && !props.clickableProps.checkIfCanBeSelected())
                return
            setState(!state)
            props.clickableProps.parentCallback(!state)
        }
    }

    const options = {
        theme: "light2",
        animationEnabled: true,
        zoomEnabled: isZoomEnabled,
        title: {
            text: props.chartTitle
        },
        axisX: {
            title: props.xAxisProps.name,
            suffix: props.xAxisProps.suffix,
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        axisY: {
            title: props.yAxisProps.name,
            suffix: props.yAxisProps.suffix,
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        data: [{
            type: "scatter",
            markerSize: 8,
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
