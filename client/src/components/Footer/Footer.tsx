import "./Footer.scss"

export default function Footer(){
    return (
        <footer>
            <div className={"footer-container"}>
                <p>If you use these data, please cite:</p>
                <p>Zmienko, A., Marszalek-Zenczak, M., Wojciechowski, P., Samelak-Czajka, A., Luczak, M., Kozlowski, P., Karlowski, W. M. and Figlerowicz, M. (2020).
                “AthCNV - a map of DNA copy number variations in Arabidopsis thaliana population”.</p>
                <p>Plant Cell 2020, 32: 1797-1819. <a href={"https://doi.org/10.1105/tpc.19.00640"}>DOI</a></p>
            </div>
        </footer>
    )
}
