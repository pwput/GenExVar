export interface IGene{
    geneId: string
    type: string
    chromosome: string
    start: number
    end: number
    CNData: ICNData
    EXPData:IEXPData
    mCGData: ImCGData
    WGCNAData: IWGCNAData
    sort: number
    covByHighConfCNVs: number
    covByLowConfCNVs: number
}

export interface IData {
    x: number
    y: number
    color?: string
}

interface IIsData{
    isData: boolean
    dataArray: IData[]
}

interface ICNData extends IIsData {}
interface IEXPData extends IIsData {}
interface ImCGData extends IIsData {}
interface IWGCNAData extends IIsData {}







