import React, {useEffect, useRef, useState} from 'react';
import Search from "../../components/Search/Search"
import ScatterChart from "../../components/ScatterChart/ScatterChart";
import BoxChart from "../../components/BoxChart/BoxChart"
import {CircularProgress, Divider} from "@mui/material";
import './gene.scss'
import {ChartType, IGene, IIsData} from "../../model/IGene";
import {BoxChartDataGroups} from "../../domain/BoxChartDataGroups";
import {DataPointColored} from "../../domain/DataPointColored";
import {getGene, getGeneIdList} from "../../api/api";
import {CorrelationData} from "../../domain/CorrelationData";

export function getDataForCommonAccessions(xData: DataPointColored[] | undefined, yData: DataPointColored[] | undefined): DataPointColored[] {
    if (xData === undefined || yData === undefined)
        return []
    const outData: DataPointColored[] = [];
    for (let i = 0; i < xData.length; i++) {
        let pap = yData.find(d => d.accessionID === xData[i].accessionID)
        if (pap !== undefined) {
            let out: DataPointColored = {x: pap.y, y: xData[i].y, accessionID: xData[i].accessionID, color: xData[i].color};
            outData.push(out)
        }
    }
    return outData
}

export default function Gene(props: { gene: IGene }) {
    const handleSearchCallback = (childData: string) => {
        setGeneID(childData)
    }

    const [isLoading, setIsLoading] = useState(false)
    const firstUpdate = useRef(true);

    const [searchOptions, setSearchOptions] = useState<string[]>([])
    const [geneID, setGeneID] = useState<string>("")
    const [gene, setGene] = useState<IGene>(props.gene)

    useEffect(() => {
        getGeneIdList().then((res) => {
            const geneIds = res.map(s => s.geneId)
            setSearchOptions(geneIds)
            console.log("Gene", "getGeneIdList() = ", geneIds)
        })
    }, [])

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        setIsLoading(true);
        getGene(geneID).then((res) => {
            let gene : IGene= res
            gene.EXPData.type = ChartType.EXP
            gene.CNData.type = ChartType.CN
            gene.mCGData.type = ChartType.mCG
            setGene(gene)
            setCorrelationData(new CorrelationData(null, null))
            console.log("Gene", "getGene() = ", res)
        }).finally(() => {
            setIsLoading(false);
        });
    }, [geneID])


    const [correlationData, setCorrelationData] =
        useState<CorrelationData>(new CorrelationData(null, null));

    const CNVvsmCGBoxPlot = () => {
        if (gene.CNData.isData && gene.mCGData.isData)
            return new BoxChartDataGroups(gene.CNData.dataArray, gene.mCGData.dataArray)
    }
    const CNVvEXPBoxPlot = () => {
        if (gene.CNData.isData && gene.EXPData.isData)
            return new BoxChartDataGroups(gene.CNData.dataArray, gene.EXPData.dataArray)
    }

    const updateCorrelationData = (newData: IIsData) => {
        setCorrelationData(correlationData => correlationData.setData(newData));
    };

    return <div className={"container"}>
        <Search topText={topText} options={searchOptions} label={"Locus ID"} buttonText={"Show Chart"}
                parentCallback={handleSearchCallback}/>
        <Divider variant="middle"/>
        {isLoading &&
            <div className="spinner-container"><CircularProgress /></div>}
        {!isLoading &&
            <div className={"content"}>
                <div className={"top-charts-container"}>
                    {gene.CNData.isData &&
                        <div className={"top-chart"} onClick={() => updateCorrelationData(gene.CNData)}>
                            <ScatterChart
                                isZoomEnabled={true}
                                clickableProps={{canBeSelected: correlationData.canSetData()}}
                                tooltipContent={"accession: {accessionID}, copies: {y}"}
                                dataPoints={gene.CNData.dataArray}
                                chartTitle={"Copy number"}
                                xAxisProps={{name: "accesions", suffix: ""}}
                                yAxisProps={{name: "copies", suffix: ""}}/>
                        </div>}
                    {gene.EXPData.isData &&
                        <div className={"top-chart"} onClick={() => updateCorrelationData(gene.EXPData)}>
                            <ScatterChart
                                isZoomEnabled={true}
                                clickableProps={{canBeSelected: correlationData.canSetData()}}
                                tooltipContent={"accession: {accessionID}, TPM: {y}"}
                                dataPoints={gene.EXPData.dataArray}
                                chartTitle={"Expression"}
                                xAxisProps={{name: "accesions", suffix: ""}}
                                yAxisProps={{name: "TPM", suffix: ""}}/>
                        </div>}
                    {gene.mCGData.isData &&
                        <div className={"top-chart"} onClick={() => updateCorrelationData(gene.mCGData)}>
                            <ScatterChart
                                isZoomEnabled={true}
                                clickableProps={{canBeSelected: correlationData.canSetData()}}
                                tooltipContent={"accession: {accessionID}, mCG ratio: {y}"}
                                dataPoints={gene.mCGData.dataArray}
                                chartTitle={"Methylation"}
                                xAxisProps={{name: "accesions", suffix: ""}}
                                yAxisProps={{name: "mCG ratio", suffix: ""}}/>
                        </div>}
                </div>
                <Divider variant="middle"/>
                {!correlationData.canSetData() && <div className={"correlation-charts-container"}>
                    <ScatterChart
                        isZoomEnabled={true}
                        plotContainerHeight={"100%"}
                        tooltipContent={"x: {x}, y: {y}"}
                        dataPoints={correlationData.getPlotData()}
                        chartTitle={correlationData.getTitle()}
                        xAxisProps={{name: correlationData.getAxisTitleX(), suffix: ""}}
                        yAxisProps={{name: correlationData.getAxisTitleY(), suffix: ""}}/>
                </div>}
                {correlationData.canSetData() && <div className={"correlation-charts-container-message"}>
                    <p className={"correlation-text"}>Select two from the above charts to see the correlation between them.</p>
                </div>}
                <Divider variant="middle"/>
                <div className={"bottom-charts-container"}>
                    {gene.CNData.isData && gene.mCGData.isData &&
                        <div className={"bottom-chart"}>
                            <BoxChart
                                dataPoints={CNVvsmCGBoxPlot()}
                                plotContainerHeight={'100%'}
                                chartTitle={"CNV vs mCG"}
                                xAxisName={"copy number group"}
                                yAxisName={"mCG"}
                                yValueFormatString={"#,##0.#"}/>
                        </div>}
                    {gene.CNData.isData && gene.EXPData.isData &&
                        <div className={"bottom-chart"}>
                            <BoxChart
                                dataPoints={CNVvEXPBoxPlot()}
                                plotContainerHeight={'100%'}
                                chartTitle={"CNV vs EXP"}
                                xAxisName={"copy number group"}
                                yAxisName={"EXP"}
                                yValueFormatString={"#,##0.#"}/>
                        </div>
                    }
                </div>
            </div>}
        <Divider variant="middle"/>
    </div>
}


const topText = "Enter valid gene locus ID (Araport 11 annotation; use capital letters) e.g. AT1G02250";
