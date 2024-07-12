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
// ChartJS.register(
//     defaults,
//     CategoryScale,
//     LinearScale,
//     Title,
//     Tooltip,
//     Legend
// )

function Graphs({result,stat,label}) {

    const keys = Object.keys(result.data)
    const values = Object.values(result.data)

    return (
        <>
            <div style={{width: "300px"}}>
                <Bar 
                    data = {{
                        labels: keys,
                        datasets:[
                            {
                                label: label,
                                data: values,
                                backgroundColor: "#00ADB5",
                                maxBarThickness: 80,
                            },
                        ],
                    }}

                    options = {{
                        scales: {
                            // xAxes: [{
                            //     maxBarThickness: 10
                            // }],
                            // labels: {
                            //     axis: 'x',
                            //     type: 'linear',
                            //     min: -0.5,
                            //     offset: false,
                            //     display: false,
                            //     ticks: {
                            //         stepSize: 1
                            //     }
                            // },
                            // y: {
                            //     beginAtZero: true
                            // },
                            // x: {
                            //     beginAtZero: true,
                            //     suggestedMin: 0
                            // }
                        },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    title: function(value){return ""},
                                    label: function(value){ 
                                        return value.label+": " + value.raw.toFixed(2)+"%"}
                                }
                            }
                        },
                    }}
                />
                <p className="h6">Avg {stat}: {result.avg}</p>
            </div>
        </>
    )
}

export default Graphs;