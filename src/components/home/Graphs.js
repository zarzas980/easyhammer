import "bootstrap/dist/css/bootstrap.min.css"
import "../../css/App.css"

import { Bar } from "react-chartjs-2";

//https://www.youtube.com/watch?v=6q5d3Z1-5kQ

/*
                    options = {{
                        scales: {
                            labels:{
                                axis: 'x',
                                type: 'linear',
                                min: -0.5,
                                offset: false,
                                display: false,
                                ticks: {
                                    stepSize: 1
                                }
                            },
                            y: {
                                min: 0
                            }
                        }
                    }}*/

function Graphs({data,stat,label}) {

    const keys = Object.keys(data)
    const values = Object.values(data)

    function getAverage(){
        let sum = 0
        for (let i=0; i<keys.length; i++){
            sum += parseInt(keys[i])*parseInt(values[i])
        }
        return sum / 100000 //WARNING: this is also hardcoded in computeResults.js as maxIterations and computeWeapon()
    }

    return (
        <>
            <div style={{width: "300px"}}>
                <Bar data = {{
                        labels: keys,
                        datasets:[
                            {
                                label: label,
                                data: values
                            },
                        ],
                    }}
                />
                <p className="h6">Avg {stat}: {getAverage()}</p>
            </div>
        </>
    )
}

export default Graphs;