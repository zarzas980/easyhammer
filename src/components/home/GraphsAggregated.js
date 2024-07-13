import "bootstrap/dist/css/bootstrap.min.css"
import "../../css/App.css"
import "../../css/GraphsBoth.css"

import { 
    Chart as ChartJS,
    defaults,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
} from "chart.js/auto";
import { Container } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { useContext } from "react";
import { ResultsContext } from "./Home";
// ChartJS.register(
//     defaults,
//     CategoryScale,
//     LinearScale,
//     Title,
//     Tooltip,
//     Legend
// )

function GraphsAggregated({results,typeOfResult}) {

    const weapons = useContext(ResultsContext)

    let labels = {}

    results.map(weaponResult => {
        labels = {...labels,...weaponResult[typeOfResult].data}
    })
    
    const colors = [
        "#EEEEEE",  // light gray
        "#00ADB5",  // cyan
        "#FF6347",  // tomato
        "#FFD700",  // gold
        "#ADFF2F",  // green-yellow
        "#FF69B4",  // hot pink
        "#FFA500",  // orange
        "#00FF7F",  // spring green
        "#1E90FF",  // dodger blue
        "#7CFC00",  // lawn green
    ];

    const dataTemplate = {}
    Object.keys(labels).map(key => {
        dataTemplate[key] = null
    })

    const datasets = []
    results.map((weaponResult,index) => {
        //All datasets must have the same base or the data doesnt plot properly. Thats why we 
        let clone = structuredClone(dataTemplate)
        clone = {...clone,...weaponResult[typeOfResult].data}
        datasets.push(
            {
                label: weapons[index].name,
                data: clone,
                backgroundColor: colors[index]
            }
        )
    })

    return (
        <>
            <Container className="graph-container" fluid>
                <Bar 
                    data = {{
                        // labels: Object.keys(labels),
                        datasets: datasets,
                    }}

                    options = {{
                        scales: {
                            x: {
                                stacked: true,
                            },
                            y: {
                                stacked: true
                            }
                        },
                        maintainAspectRatio: false,
                        responsive: true,
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    title: function(value){return ""},
                                    label: function(value){ 
                                        return value.label+": " + value.parsed.y.toFixed(2)+"%"}
                                }
                            },
                            title: {
                                display: true,
                                text: typeOfResult
                            }
                        },
                    }}
                />
                {/* <p className="h6">Avg {stat}: {result.avg}</p> */}
            </Container>
        </>
    )
}

export default GraphsAggregated;