import React, {useState} from 'react';
import Search from "../../components/Search/Search"
import ScatterChart from "../../components/DottedChart/ScatterChart";
import BoxChart from "../../components/BoxPlot/BoxChart"
import {Divider} from "@mui/material";
import './gene.scss'
import {IGene} from "../../model/IGene";


export default function Gene(props:{gene : IGene} ) {
    const handleSearchCallback = (childData: string) => {
        alert(childData)
    }

    const maxDataCount =
        Number(props.gene.CNData.isData) +
        Number(props.gene.EXPData.isData) +
        Number(props.gene.mCGData.isData)

    const [isCNDataValue,setIsCNDataValue]=useState(false)
    const [isEXPDataValue,setIsEXPDataValue]=useState(false)
    const [ismCGDataValue,setIsmCGDataValue]=useState(false)

    function canSelectPlot(){
        const nowSelectedCount =
            Number(isCNDataValue) +
            Number(isEXPDataValue) +
            Number(ismCGDataValue)
        return nowSelectedCount < 2
    }

    return <div className={"container"}>
            <Search topText={topText} options={geneIds} label={"Locus ID"} buttonText={"Show Chart"}
                    parentCallback={handleSearchCallback}/>
            <Divider variant="middle"/>
            <div className={"top-charts-container"}>
                <div className={"top-chart"}>
                    <ScatterChart
                        clickableProps={{parentCallback: setIsCNDataValue, checkIfCanBeSelected:canSelectPlot}}
                        tooltipContent={"x: {x}, y: {y}"}
                        dataPoints={props.gene.CNData.dataArray}
                        chartTitle={"title"}
                        xAxisProps= {{name: "accession_id", suffix: ""}}
                        yAxisProps={{name: "cn_value", suffix: ""}}/>
                </div>
                <div className={"top-chart"}>
                    <ScatterChart
                        clickableProps={{parentCallback: setIsEXPDataValue, checkIfCanBeSelected:canSelectPlot}}
                        tooltipContent={"accession_id: {x}, exp_value: {y}"}
                        dataPoints={props.gene.EXPData.dataArray}
                        chartTitle={"exp"}
                        xAxisProps= {{name: "accession_id", suffix: ""}}
                        yAxisProps={{name: "exp_value", suffix: ""}}/>
                </div>
                <div className={"top-chart"}>
                    <ScatterChart
                        clickableProps={{parentCallback: setIsmCGDataValue, checkIfCanBeSelected:canSelectPlot}}
                        tooltipContent={"accession_id: {x}, mcg_value: {y}"}
                        dataPoints={props.gene.mCGData.dataArray}
                        chartTitle={"mCG"}
                        xAxisProps= {{name: "accession_id", suffix: ""}}
                        yAxisProps={{name: "mcg_value", suffix: ""}}/>
                </div>
            </div>
            <Divider variant="middle"/>
        <p>Selected:{isCNDataValue? "cn": ""} {isEXPDataValue? "exp": ""} {ismCGDataValue? "mcg": ""}</p>
            <div className={"correlation-charts-container"}>
                <ScatterChart
                    tooltipContent={"x: {x}, y: {y}"}
                    dataPoints={props.gene.mCGData.dataArray}
                    chartTitle={"title"}
                    xAxisProps= {{name: "xname", suffix: "xx"}}
                    yAxisProps={{name: "yName", suffix: "yy"}}/>
            </div>
            <Divider variant="middle"/>
            <div className={"bottom-charts-container"}>
                <div className={"bottom-chart"}>
                    <BoxChart
                        dataPoints={dataPoints}
                        plotContainerHeight={'100%'}
                        chartTitle={"title"}
                        xAxisName={"xname"}
                        yAxisName={"yName"}
                        yValueFormatString={"#,##0.#"}/>
                </div>
                <div className={"bottom-chart"}>
                    <BoxChart
                        dataPoints={dataPoints}
                        plotContainerHeight={'100%'}
                        chartTitle={"title"}
                        xAxisName={"xname"}
                        yAxisName={"yName"}
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
