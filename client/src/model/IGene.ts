import {DataPointColored} from "../domain/DataPointColored";

export interface IGene {
    _id: string
    geneId: string
    type: string
    chromosome: string
    start: number
    end: number
    CNData: ICNData
    EXPData: IEXPData
    mCGData: ImCGData
    sort: number
    covByHighConfCNVs: number
    covByLowConfCNVs: number
}


export interface IIsData {
    isData: boolean
    dataArray: DataPointColored[]
    type: ChartType
}

interface ICNData extends IIsData {
}

interface IEXPData extends IIsData {
}

interface ImCGData extends IIsData {
}

export enum ChartType {
    CN = "CN",
    EXP = "EXP",
    mCG = "mCG"
}

interface ChartAxisLabels {
    x: string
    y: string
}

const chartAxisLabels = {
    CN: {x: "accessions", y: "copies"},
    EXP: {x: "accessions", y: "TPM"},
    mCG: {x: "accessions", y: "mCG ratio"}
};

export function getChartTitle(data: IIsData): string {
    switch (data.type) {
        case ChartType.CN:
            return "Copy Number"
        case ChartType.EXP:
            return "Expression"
        case ChartType.mCG:
            return "Methylation"
        default:
            return ""
    }
}

export function getChartAxisLabels(data: IIsData): ChartAxisLabels {
    switch (data.type) {
        case ChartType.CN:
            return chartAxisLabels.CN
        case ChartType.EXP:
            return chartAxisLabels.EXP
        case ChartType.mCG:
            return chartAxisLabels.mCG
        default:
            return {x: "", y: ""}
    }
}