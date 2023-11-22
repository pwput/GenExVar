import React, {useState} from 'react';
import Search from "../../components/Search/Search"
import ScatterChart from "../../components/DottedChart/ScatterChart";
import BoxChart from "../../components/BoxPlot/BoxChart"
import {Divider} from "@mui/material";
import './gene.scss'
import {getChartAxisLabels, getChartTitle, IData, IGene, IIsData} from "../../model/IGene";
import {IBoxDataPoints} from "../../model/IBoxDataPoints";


export default function Gene(props: { gene: IGene }) {
    const handleSearchCallback = (childData: string) => {
        alert(childData)
    }

    const [correlationxData, setcorrelationxData] =
        useState<IIsData | null>(null)
    const [correlationyData, setcorrelationyData] =
        useState<IIsData | null>(null)

    const correlationData = getDataForCommonAccessions(correlationxData?.dataArray, correlationyData?.dataArray)

    const correlationTitle = getTitle(correlationxData, correlationyData)

    const correlationXAxisTitle = getYAxisTitle(correlationxData)

    const correlationYAxisTitle = getYAxisTitle(correlationyData)

    const canSetData = correlationxData === null || correlationyData === null

    function getDataForCommonAccessions(xData: IData[] | undefined, yData: IData[] | undefined): IData[] {
        if (xData === undefined || yData === undefined)
            return []
        const outData: IData[] = [];
        for (let i = 0; i < xData.length; i++) {
            let pap = yData.find(d => d.accessionID === xData[i].accessionID)
            if (pap !== undefined) {
                let out: IData = {x: pap.y, y: xData[i].y, accessionID: xData[i].accessionID, color: xData[i].color};
                outData.push(out)
            }
        }
        return outData
    }

    function getBoxPlotData(xData: IData[] | undefined, yData: IData[] | undefined): IBoxDataPoints {
        const common = getDataForCommonAccessions(xData, yData)
        const boxData = new IBoxDataPoints()

        for (let i = 0; i < common.length; i++) {
            if (common[i].y < 1) {
                boxData.x0.push(common[i].y)
            } else if (common[i].y < 3) {
                boxData.x2.push(common[i].y)
            } else if (common[i].y < 5) {
                boxData.x4.push(common[i].y)
            } else {
                boxData.x6.push(common[i].y)
            }
        }

        return boxData
    }

    function getTitle(xD: IIsData | null, yD: IIsData | null): string {
        if (xD && yD) {
            return `Correlation between ${getChartTitle(xD)} and ${getChartTitle(yD)}`
        }
        return ""
    }

    function getYAxisTitle(data: IIsData | null): string {
        if (data)
            return getChartAxisLabels(data).y
        return ""
    }

    const setData = (data: IIsData) => {
        if (correlationxData === null && correlationyData?.type !== data.type) {
            setcorrelationxData(data)
            return
        }
        if (correlationxData?.type !== data.type && correlationyData === null) {
            setcorrelationyData(data)
            return
        }
        if (correlationxData?.type === data.type) {
            setcorrelationxData(null)
            return
        }
        if (correlationyData?.type === data.type) {
            setcorrelationyData(null)
            return
        }
    }


    return <div className={"container"}>
        <Search topText={topText} options={geneIds} label={"Locus ID"} buttonText={"Show Chart"}
                parentCallback={handleSearchCallback}/>
        <Divider variant="middle"/>
        <div className={"top-charts-container"}>
            <div className={"top-chart"} onClick={() => setData(props.gene.CNData)}>
                <ScatterChart
                    isZoomEnabled={true}
                    clickableProps={{canBeSelected: canSetData}}
                    tooltipContent={"accession: {accessionID}, copies: {y}"}
                    dataPoints={props.gene.CNData.dataArray}
                    chartTitle={"Copy number"}
                    xAxisProps={{name: "accesions", suffix: ""}}
                    yAxisProps={{name: "copies", suffix: ""}}/>
            </div>
            <div className={"top-chart"} onClick={() => setData(props.gene.EXPData)}>
                <ScatterChart
                    isZoomEnabled={true}
                    clickableProps={{canBeSelected: canSetData}}
                    tooltipContent={"accession: {accessionID}, TPM: {y}"}
                    dataPoints={props.gene.EXPData.dataArray}
                    chartTitle={"Expression"}
                    xAxisProps={{name: "accesions", suffix: ""}}
                    yAxisProps={{name: "TPM", suffix: ""}}/>
            </div>
            <div className={"top-chart"} onClick={() => setData(props.gene.mCGData)}>
                <ScatterChart
                    isZoomEnabled={true}
                    clickableProps={{canBeSelected: canSetData}}
                    tooltipContent={"accession: {accessionID}, mCG ratio: {y}"}
                    dataPoints={props.gene.mCGData.dataArray}
                    chartTitle={"Methylation"}
                    xAxisProps={{name: "accesions", suffix: ""}}
                    yAxisProps={{name: "mCG ratio", suffix: ""}}/>
            </div>
        </div>
        <Divider variant="middle"/>
        {!canSetData && <div className={"correlation-charts-container"}>
            <ScatterChart
                isZoomEnabled={true}
                plotContainerHeight={"100%"}
                tooltipContent={"x: {x}, y: {y}"}
                dataPoints={correlationData}
                chartTitle={correlationTitle}
                xAxisProps={{name: correlationXAxisTitle, suffix: ""}}
                yAxisProps={{name: correlationYAxisTitle, suffix: ""}}/>
        </div>}
        {canSetData && <div className={"correlation-charts-container-message"}>
            <p>Select two from the above charts to see the correlation between them.</p>
        </div>}
        <Divider variant="middle"/>
        <div className={"bottom-charts-container"}>
            <div className={"bottom-chart"}>
                <BoxChart
                    dataPoints={getBoxPlotData(props.gene.mCGData.dataArray,props.gene.CNData.dataArray )}
                    plotContainerHeight={'100%'}
                    chartTitle={"CNV vs mCG"}
                    xAxisName={"CNV"}
                    yAxisName={"mCG"}
                    yValueFormatString={"#,##0.#"}/>
            </div>
            <div className={"bottom-chart"}>
                <BoxChart
                    dataPoints={getBoxPlotData(props.gene.EXPData.dataArray,props.gene.CNData.dataArray )}
                    plotContainerHeight={'100%'}
                    chartTitle={"CNV vs EXP"}
                    xAxisName={"CNV"}
                    yAxisName={"EXP"}
                    yValueFormatString={"#,##0.#"}/>
            </div>
        </div>
        <Divider variant="middle"/>
    </div>
}

const geneIds = [
    "AT1G01010",
    "AT1G01020",
];

const topText = "Enter valid gene locus ID (Araport 11 annotation; use capital letters) e.g. AT1G02250";
