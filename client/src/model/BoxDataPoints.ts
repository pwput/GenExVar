import {quantile, min, max} from "simple-statistics";
import {IData} from "./IGene";

const minGroupSize = 5

class DataGroup {
    constructor(label: string) {
        this.group = []
        this.label = label
    }

    group: number[] = []
    label: string = ""
}


export class BoxDataPoints {
    x0 = new DataGroup("0")
    x2 = new DataGroup("2")
    x4 = new DataGroup("4")
    x6 = new DataGroup("6")

    groups = [this.x0, this.x2, this.x4, this.x6]

    constructor(xData: IData[] | undefined, yData: IData[] | undefined) {
        const common = this.getDataForCommonAccessions(xData, yData)
        for (let i = 0; i < common.length; i++) {
            if (common[i].x < 1) {
                this.x0.group.push(common[i].y)
            } else if (common[i].x < 3) {
                this.x2.group.push(common[i].y)
            } else if (common[i].x < 5) {
                this.x4.group.push(common[i].y)
            } else {
                this.x6.group.push(common[i].y)
            }
        }
    }

    private  getDataForCommonAccessions(xData: IData[] | undefined, yData: IData[] | undefined): IData[] {
        if (xData === undefined || yData === undefined)
            return []
        const outData: IData[] = [];
        for (let i = 0; i < xData.length; i++) {
            let pap = yData.find(d => d.accessionID === xData[i].accessionID)
            if (pap !== undefined) {
                let out: IData = {x: xData[i].y, y: pap.y, accessionID: xData[i].accessionID, color: xData[i].color};
                outData.push(out)
            }
        }
        return outData
    }


    private getBoxPlotDataPoints(data: number[]): number[] {
        let q1 = quantile(data, .25)
        let q2 = quantile(data, .5)
        let q3 = quantile(data, .75)
        let minimum = min(data)
        let maximum = max(data)
        return [minimum, q1, q3, maximum, q2];
    }

    getBoxPlotData(): { x: string, y: number[] }[] {
        let boxPlotData: { x: string, y: number[] }[] = []
        for (let i = 0; i < this.groups.length; i++) {
            if (this.groups[i].group.length > minGroupSize)
                boxPlotData.push({x: this.groups[i].label, y: this.getBoxPlotDataPoints(this.groups[i].group)})
            else
                boxPlotData.push({x: this.groups[i].label, y: []})
        }
        return boxPlotData
    }

    getScatterPlotData(): { x: string, y: number }[] {
        let scatterPlotData: { x: string, y: number }[] = []
        for (let i = 0; i < this.groups.length; i++) {
            if (this.groups[i].group.length <= minGroupSize)
                for (let j = 0; j < this.groups[i].group.length; j++)
                    scatterPlotData.push({x: this.groups[i].label, y: this.groups[i].group[j]})
        }
        return scatterPlotData
    }
}
