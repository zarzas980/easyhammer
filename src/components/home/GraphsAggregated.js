import "bootstrap/dist/css/bootstrap.min.css"
import "../../css/App.css"

import { 
    Chart as ChartJS,
    defaults,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
} from "chart.js/auto";
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
    
    const colors = ["#EEEEEE","#00ADB5","#000000"]

    const datasets = []
    results.map((weaponResult,index) => {
        datasets.push(
            {
                label: weapons[index].name,
                data: Object.values(weaponResult[typeOfResult].data),
                backgroundColor: colors[index]
            }
        )
    })

    console.log("Datasets")
    console.log(datasets)

    return (
        <>
            <div style={{width: "300px"}}>
                <Bar 
                    data = {{
                        labels: Object.keys(labels),
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
                        responsive: true,
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    title: function(value){return ""},
                                    label: function(value){ 
                                        return value.label+": " + value.raw.toFixed(2)+"%"}
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
            </div>
        </>
    )
}

export default GraphsAggregated;