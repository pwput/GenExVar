import React, {useState} from 'react';
import Search from "../../components/Search/Search"
import ScatterChart from "../../components/DottedChart/ScatterChart";
import BoxChart from "../../components/BoxPlot/BoxChart"
import {Divider} from "@mui/material";
import './gene.scss'
import {ChartType, CorrelationData, IData, IGene} from "../../model/IGene";


export default function Gene(props: { gene: IGene }) {
    const handleSearchCallback = (childData: string) => {
        alert(childData)
    }

    const [isCNDataValue, setIsCNDataValue] = useState(false)
    const [isEXPDataValue, setIsEXPDataValue] = useState(false)
    const [ismCGDataValue, setIsmCGDataValue] = useState(false)

    const [correlationData, setCorrelationData] =
        useState<CorrelationData>(new CorrelationData())


    function canSelectPlot() {
        const nowSelectedCount =
            Number(isCNDataValue) +
            Number(isEXPDataValue) +
            Number(ismCGDataValue)
        return nowSelectedCount < 2
    }

    function isCorrelationPlotVisible() {
        const nowSelectedCount =
            Number(isCNDataValue) +
            Number(isEXPDataValue) +
            Number(ismCGDataValue)
        return nowSelectedCount == 2
    }

    function getCorrelationTitle() {
        let title = "";
        if (isCNDataValue) title += "cn"
        if (isEXPDataValue) title += "exp"
        if (ismCGDataValue) title += "mcg"
        return title
    }

    function getCorrelation() {
        let xData: IData[], yData: IData[];
        if (isCNDataValue) {
            xData = props.gene.CNData.dataArray
            if (isEXPDataValue) yData = props.gene.EXPData.dataArray
            else yData = props.gene.mCGData.dataArray
        }else {
            xData = props.gene.EXPData.dataArray
            yData = props.gene.mCGData.dataArray
        }
        const outData: IData[] = [];
        for (let i = 0; i < xData.length; i++) {
            let pap = yData.find(d => d.accessionID == xData[i].accessionID)
            if (pap != undefined) {
                let out: IData = {x: pap.y, y: xData[i].y, accessionID: xData[i].accessionID, color: xData[i].color};
                outData.push(out)
            }
        }
        return outData
    }

    return <div className={"container"}>
        <Search topText={topText} options={geneIds} label={"Locus ID"} buttonText={"Show Chart"}
                parentCallback={handleSearchCallback}/>
        <Divider variant="middle"/>
        <div className={"top-charts-container"}>
            <div className={"top-chart"}>
                <ScatterChart
                    isZoomEnabled={true}
                    clickableProps={{parentCallback: setIsCNDataValue, checkIfCanBeSelected: canSelectPlot}}
                    tooltipContent={"accession: {accessionID}, copies: {y}"}
                    dataPoints={props.gene.CNData.dataArray}
                    chartTitle={"Copy number"}
                    xAxisProps={{name: "accesions", suffix: ""}}
                    yAxisProps={{name: "copies", suffix: ""}}/>
            </div>
            <div className={"top-chart"}>
                <ScatterChart
                    isZoomEnabled={true}
                    clickableProps={{parentCallback: setIsEXPDataValue, checkIfCanBeSelected: canSelectPlot}}
                    tooltipContent={"accession: {accessionID}, TPM: {y}"}
                    dataPoints={props.gene.EXPData.dataArray}
                    chartTitle={"Expression"}
                    xAxisProps={{name: "accesions", suffix: ""}}
                    yAxisProps={{name: "TPM", suffix: ""}}/>
            </div>
            <div className={"top-chart"}>
                <ScatterChart
                    clickableProps={{parentCallback: setIsmCGDataValue, checkIfCanBeSelected: canSelectPlot}}
                    tooltipContent={"accession: {accessionID}, mCG ratio: {y}"}
                    dataPoints={props.gene.mCGData.dataArray}
                    chartTitle={"Methylation"}
                    xAxisProps={{name: "accesions", suffix: ""}}
                    yAxisProps={{name: "mCG ratio", suffix: ""}}/>
            </div>
        </div>
        <Divider variant="middle"/>
        { isCorrelationPlotVisible() &&
        <div className={"correlation-charts-container"}>
            <ScatterChart
                isZoomEnabled={true}
                plotContainerHeight={"100%"}
                tooltipContent={"x: {x}, y: {y}"}
                dataPoints={getCorrelation()}
                chartTitle={getCorrelationTitle()}
                xAxisProps={{name: "xname", suffix: ""}}
                yAxisProps={{name: "yName", suffix: ""}}/>
        </div>}
        <Divider variant="middle"/>
        <div className={"bottom-charts-container"}>
            <div className={"bottom-chart"}>
                <BoxChart
                    dataPoints={dataPoints}
                    plotContainerHeight={'100%'}
                    chartTitle={"CNV vs mCG"}
                    xAxisName={"CNV"}
                    yAxisName={"mCG"}
                    yValueFormatString={"#,##0.#"}/>
            </div>
            <div className={"bottom-chart"}>
                <BoxChart
                    dataPoints={dataPoints}
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


const dataPoints = [
    {label: "Bread", y: [179, 256, 300, 418, 274]},
    {label: "Cake", y: [252, 346, 409, 437, 374.5]},
    {label: "Biscuit", y: [236, 281.5, 336.5, 428, 313]},
    {label: "Doughnut", y: [340, 382, 430, 452, 417]},
    {label: "Pancakes", y: [194, 224.5, 342, 384, 251]},
    {label: "Bagels", y: [241, 255, 276.5, 294, 274.5]}
]

const geneIds = [
    "AT1G01010",
    "AT1G01020",
];

const topText = "Enter valid gene locus ID (Araport 11 annotation; use capital letters) e.g. AT1G02250";
