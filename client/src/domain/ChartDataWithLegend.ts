import {DataPoint} from "./DataPoint";
import {DataPointColored} from "./DataPointColored";

export type ChartDataWithLegend = {
    type: string
    showInLegend: boolean
    name: string
    legendText: string
    toolTipContent: string | null,
    color: string
    dataPoints: DataPoint[]
}

export function groupByColor(data: DataPointColored[]): Record<string, DataPoint[]> {
    return data.reduce((acc: Record<string, DataPointColored[]>, curr: DataPointColored) => {
        if (acc[curr.color] === undefined) {
            acc[curr.color] = []
        }
        acc[curr.color].push(curr)
        return acc
    }, {} as Record<string, DataPointColored[]>)
}

export function getDataWithLegend(data: DataPointColored[], toolTipContent: string | null): ChartDataWithLegend[] {
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