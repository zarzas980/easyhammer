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
import annotationPlugin from "chartjs-plugin-annotation";
ChartJS.register(annotationPlugin);
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
                                type: "bar",
                                label: "Discrete",
                                data: result.data,
                                backgroundColor: "#00ADB5",
                                xAxisID: "discrete-x",
                                yAxisID: "discrete-y",
                                maxBarThickness: 80,
                                order: 2
                            },
                            {
                                type: "line",
                                label: "Cumulative",
                                data: result.cumulative,
                                borderColor: "#EEEEEE",
                                xAxisID: "discrete-x",
                                yAxisID: "cumulative-y",
                                order: 1
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
                            },                        
                            annotation: {
                                annotations: {
                                    averageLine: {
                                        type: "line",
                                        mode: "vertical",
                                        scaleID: "discrete-x",
                                        value: result.avg,
                                        borderColor: "red",
                                        label: {
                                          content: "Average",
                                          enabled: true,
                                          position: "top"
                                        }
                                    }
                                }
                            },
                            legend: {
                                display: true,
                                labels: {
                                    pointStyle: "circle",
                                    usePointStyle: true,
                                },
                            }
                        },
                        scales: {
                            "discrete-x": {
                                type: 'linear',
                                position: "bottom",
                            },
                            "discrete-y": {
                                position: "left",
                            },
                            "cumulative-y": {
                                type: "linear",
                                position: "right",
                            }
                        },
                        interaction: {
                            intersect: false,
                            mode: "index",
                        },
                    }}
                />
                <p className="h6">Avg {stat}: {result.avg}</p>
            </div>
        </>
    )
}

export default Graphs;