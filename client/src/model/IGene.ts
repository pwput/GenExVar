export interface IGene{
    geneId: string
    type: string
    chromosome: string
    start: number
    end: number
    CNData: ICNData
    EXPData:IEXPData
    mCGData: ImCGData
    sort: number
    covByHighConfCNVs: number
    covByLowConfCNVs: number
}

export interface IData {
    x: number
    y: number
    accessionID: number
    color?: string
}

interface IIsData {
    isData: boolean
    dataArray: IData[]
    type: ChartType
}

interface ICNData extends IIsData{}
interface IEXPData extends IIsData{}
interface ImCGData extends IIsData{}

export enum ChartType{
    CN = "CN",
    EXP = "EXP",
    mCG = "mCG"
}

interface ChartAxisLabels{
    x: string
    y: string
}

const chartAxisLabels  = {
    CN:  { x: "accessions", y: "copies" },
    EXP: { x: "accessions", y: "TPM" },
    mCG: { x: "accessions", y: "mCG ratio" }
};

export function getChartTitle(data: IIsData): string{
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

export function getChartAxisLabels(data: IIsData): ChartAxisLabels{
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

export class CorrelationData{
    xData: IIsData | null = null
    yData: IIsData | null = null

    constructor() {
        this.xData = null;
        this.yData = null;
    }

    getTitle(): string{
        if(this.xData && this.yData){
            return `Correlation between ${getChartTitle(this.xData)} and ${getChartTitle(this.yData)}`
        }
        return ""
    }

    getXAxisTitle(): string {
        if (this.xData && this.yData) {
            return getChartAxisLabels(this.xData).x
        }
        return ""
    }
    getYAxisTitle(): string{
        if (this.xData && this.yData) {
            return getChartAxisLabels(this.yData).y
        }
        return ""
    }

    setData( data: IIsData){
        if (this.xData === null){
            this.xData = data
            return
        }

        if (this.yData === null){
            this.yData = data
            return
        }

        if(this.xData?.type === data.type){
            this.xData = null
            return
        }

        if(this.yData?.type === data.type){
            this.yData = null
            return
        }
    }
}





