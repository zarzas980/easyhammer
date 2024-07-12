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

    return (
        <>
            <div style={{width: "300px"}}>
                <Bar 
                    data = {{
                        datasets:[
                            {
                                label: "Discrete",
                                data: result.data,
                                backgroundColor: "#00ADB5",
                                maxBarThickness: 80,
                            },
                        ],
                    }}

                    options = {{
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    title: function(value){return ""},
                                    label: function(value){ 
                                        return value.label+": " + value.parsed.y.toFixed(2)+"%"
                                    }
                                }
                            },
                            title: {
                                display: true,
                                text: label
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