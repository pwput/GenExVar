import {getChartAxisLabels, getChartTitle, IIsData} from "../model/IGene";
import {DataPointColored} from "./DataPointColored";
import {getDataForCommonAccessions} from "../pages/gene/gene";

export class CorrelationData{
    constructor(xData: IIsData | null, yData: IIsData | null) {
        this.xData = xData
        this.yData = yData
    }

    xData: IIsData | null = null
    yData: IIsData | null = null

    public getPlotData(): DataPointColored[] {
        return getDataForCommonAccessions(this.xData?.dataArray, this.yData?.dataArray)
    }

    setData(newData: IIsData): CorrelationData {
        let newXData = this.xData;
        let newYData = this.yData;

        if (this.xData === null && (!this.yData || this.yData.type !== newData.type)) {
            newXData = newData;
        }
        else if (this.yData === null && (!this.xData || this.xData.type !== newData.type)) {
            newYData = newData;
        }
        else if (this.xData && this.xData.type === newData.type) {
            newXData = null;
        }
        else if (this.yData && this.yData.type === newData.type) {
            newYData = null;
        }

        return new CorrelationData(newXData, newYData);
    }

    private getAxisTitle(data: IIsData | null): string {
        if (data)
            return getChartAxisLabels(data).y
        return ""
    }

    public canSetData(): boolean {
        return this.xData === null || this.yData === null
    }

    public getTitle(): string {
        if (this.xData && this.yData) {
            return `Correlation between ${getChartTitle(this.xData)} and ${getChartTitle(this.yData)}`
        }
        return ""
    }

    public getAxisTitleX(): string {
        return this.getAxisTitle(this.xData)
    }

    public getAxisTitleY(): string {
        return this.getAxisTitle(this.yData)
    }

}