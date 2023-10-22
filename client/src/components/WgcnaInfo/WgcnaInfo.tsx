import React from "react";
import "./Wgcnainfo.scss"

export default function WgcnaInfo(
    props:{
        moduleName: string,
        genesCount: string,
        hubGeneId: string
    }
){
    return (<div className={"wgcnaInfo"}>
        <p className={"wgcnaInfo-row"}>Module name: {props.moduleName}</p>
        <p className={"wgcnaInfo-row"}>Genes count: {props.genesCount}</p>
        <p className={"wgcnaInfo-row"}>HubGeneId name: {props.hubGeneId}</p>
    </div>)
}