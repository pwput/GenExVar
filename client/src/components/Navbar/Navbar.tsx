import "./Navbar.scss"
import {Link} from "react-router-dom";
import {AppBar, Toolbar, Typography} from "@mui/material";

export default function Navbar(){
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h4" className={"logo"}>
                    GenExVar
                </Typography>
                <div className={"navlinks"}>
                    <Link to="/gene" className={"link"}>
                        GENE
                    </Link>
                    <Link to="/wgcna" className={"link"}>
                        WGCNA
                    </Link>
                    <Link to="/phenotype" className={"link"}>
                        PHENOTYPE
                    </Link>
                </div>
            </Toolbar>
        </AppBar>
    )
}
