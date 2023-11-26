import React, {useEffect, useState} from 'react';
import Search from "../../components/Search/Search";
import {Divider} from "@mui/material";
import WgcnaInfo from "../../components/WgcnaInfo/WgcnaInfo";
import {getWGCNAGroupList} from "../../api/api";

export default function Wgcna() {

    const topText = "Enter valid wgcna group";

    const handleCallback = (childData: string) => {
        alert(childData)
    }

    const [searchOptions, setSearchOptions] = useState<string[]>([])

    useEffect(() => {
        getWGCNAGroupList().then((res) => {
            setSearchOptions(res)
            console.log("Wgcna","getWGCNAGroupList() = ",res)
        })
    }, [])

    return (<div className={"container"}>
        <Search topText={topText} options={searchOptions} label={"wgcna"} buttonText={"Show Data"}
                parentCallback={handleCallback}/>
        <Divider variant="middle"/>
        <WgcnaInfo genesCount={"2"} hubGeneId={"AT1G17050"} moduleName={"7"}/>
        <Divider variant="middle"/>
    </div>)
}
