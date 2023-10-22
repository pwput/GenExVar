import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Route, Routes} from 'react-router-dom';
import Gene from "./pages/gene/gene";
import Wgcna from "./pages/wgcna/wgcna";
import Phenotype from "./pages/phenotype/phenotype";
import Footer from "./components/Footer/Footer";
import {IGene} from "./model/IGene";

function App() {
    return (
        <div className="App">
            <Navbar/>
            <Routes>
                <Route path="/" element={<Gene gene={gene}/>}/>
                <Route path="/gene" element={<Gene gene={gene}/>}/>
                <Route path="/wgcna" element={<Wgcna/>}/>
                <Route path="/phenotype" element={<Phenotype/>}/>
            </Routes>
            <Footer/>
       </div>
    );
}

export default App;


const gene: IGene = {
    geneId: "AT1G01010",
    type: "protein-coding gene",
    chromosome: "Chr1",
    start: 3630,
    end: 5899,
    CNData: {
        isData: true,
        dataArray: [
            {x: 9606, y: 1.7982},
            {x: 6911, y: 1.7721},
            {x: 9905, y: 2.2411},
            {x: 9887, y: 2.1374},
            {x: 9879, y: 1.8922},
            {x: 9871, y: 2.0454},
            {x: 9869, y: 1.8762},
            {x: 9837, y: 1.76},
            {x: 9832, y: 2.0741},
            {x: 9600, y: 1.5365},
            {x: 9598, y: 1.9822},
            {x: 9583, y: 1.5809},
        ]
    },
    EXPData: {
        isData: true,
        dataArray: [
            {x: 108, y: 4.930842315},
            {x: 139, y: 5.858525934},
            {x: 159, y: 5.112783158},
            {x: 265, y: 3.479873069},
            {x: 350, y: 4.416349974},
            {x: 351, y: 6.910971874},
            {x: 403, y: 5.701922149},
            {x: 410, y: 5.984692861},
            {x: 424, y: 6.73031353},
            {x: 428, y: 7.632808575},
            {x: 506, y: 8.527780861},
            {x: 630, y: 7.695199165},
        ]
    },
    mCGData: {
        isData: true,
        dataArray: [
            {x: 88, y: 0},
            {x: 108, y: 0.015384615},
            {x: 159, y: 0},
            {x: 265, y: 0.04640884},
            {x: 350, y: 0.010344828},
            {x: 351, y: 0.0693153},
            {x: 403, y: 0.02675059},
            {x: 410, y: 0},
            {x: 424, y: 0.053386912},
            {x: 428, y: 0.064046579},
            {x: 430, y: 0.037593985},
            {x: 506, y: 0.032921811},
        ]
    },
    WGCNAData: {
        isData: true,
        dataArray: [
            {x: 9606, y: 1.7982},
        ]
    },
    sort: 0,
    covByHighConfCNVs: 0,
    covByLowConfCNVs: 0,
}