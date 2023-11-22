import {mean, quantile, min, max} from "simple-statistics";

export class IBoxDataPoints {
    x0: number[] = []
    x2: number[] = []
    x4: number[] = []
    x6: number[] = []

    IBoxDataPoints() {
        this.x0 = []
        this.x2 = []
        this.x4 = []
        this.x6 = []
    }

    getBoxPlotParams(data: number[]): number[] {
        let q1 = quantile(data, .25)
        let q2 = quantile(data, .5)
        let q3 = quantile(data, .75)
        let minimum = min(data)
        let maximum = max(data)
        //y: [Minimum, Q1, Q3, Maximum, Q2]
        return [minimum, q1, q3, maximum, q2];
    }

    getBoxPlotData(data: number[], label: string):
        { label: string, y: number[] } {
        let boxPlotData: number[]
        if (data.length > 5)
            boxPlotData = this.getBoxPlotParams(data)
        else
            boxPlotData = []
        return {label: label, y: boxPlotData}

    }

    getScatterPlotData(): { x: string, y: number }[] {
        let scatterPlotData: { x: string, y: number }[] = []
        if (this.x0.length <= 5)
            for (let i = 0; i < this.x0.length; i++)
                scatterPlotData.push({x: "0", y: this.x0[i]})
        if (this.x2.length <= 5)
            for (let i = 0; i < this.x2.length; i++)
                scatterPlotData.push({x: "2", y: this.x2[i]})
        if (this.x4.length <= 5)
            for (let i = 0; i < this.x4.length; i++)
                scatterPlotData.push({x: "4", y: this.x4[i]})
        if (this.x6.length <= 5)
            for (let i = 0; i < this.x6.length; i++)
                scatterPlotData.push({x: "6+", y: this.x6[i]})
        return scatterPlotData
    }
}
