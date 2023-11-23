export interface IGene {
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

export interface IData {
    x: number
    y: number
    accessionID: number
    color: string
}

export interface IDataPoint {
    x: number
    y: number
    accessionID: number
}

interface IDataWithLegend  {
    type: string
    showInLegend: boolean
    name: string
    legendText: string
    toolTipContent: string | null,
    color: string
    dataPoints: IDataPoint[]
}


export function groupByColor(data: IData[]): Record<string, IDataPoint[]> {
    return data.reduce((acc: Record<string, IData[]>, curr: IData) => {
        if (acc[curr.color] === undefined) {
            acc[curr.color] = []
        }
        acc[curr.color].push(curr)
        return acc
    }, {} as Record<string, IData[]>)
}

export function getDataWithLegend(data: IData[],toolTipContent: string | null): IDataWithLegend[] {
    const groupedData = groupByColor(data)
    return Object.keys(groupedData).map(key => {
        return {
            type: "scatter",
            showInLegend: true,
            name: key,
            legendText: getNameToColor(key),
            toolTipContent: toolTipContent,
            markerSize: 4,
            color: key,
            dataPoints: groupedData[key]
        }
    })

}

function getNameToColor(color:string):string{
    switch (color) {
        case "black":
            return "Relicts"
        case "PaleVioletRed":
            return "Spain"
        case "darkblue":
            return "North Sweden"
        case "lightblue":
            return "South Sweden"
        case "yellow":
            return "Western Europe"
        case "orange":
            return "Central Europe"
        case "purple":
            return "Italy/Balkan/Caucasus"
        case "darkred":
            return "Asia"
        case "darkgrey":
            return "Admixed"
        case "lightgreen":
            return "USA (Germany)"
        case "darkgreen":
            return "Germany"
        case "lightgrey":
            return "Germany"
        default:
            return "not Implemented"
    }

}

export interface IIsData {
    isData: boolean
    dataArray: IData[]
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