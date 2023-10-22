import React from 'react';
import Search from "../../components/Search/Search";
import {Divider} from "@mui/material";
import WgcnaInfo from "../../components/WgcnaInfo/WgcnaInfo";

export default function Wgcna() {
    const geneIds = [
        "1",
        "2",
    ];

    const topText = "Enter valid wgcna group";


    const handleCallback = (childData: string) => {
        alert(childData)
    }

    return (<div className={"container"}>
        <Search topText={topText} options={geneIds} label={"wgcna"} buttonText={"Show Data"}
                parentCallback={handleCallback}/>
        <Divider variant="middle"/>
        <WgcnaInfo genesCount={"2"} hubGeneId={"AT1G17050"} moduleName={"7"}/>
        <Divider variant="middle"/>
    </div>)
}
