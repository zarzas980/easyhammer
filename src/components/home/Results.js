import "bootstrap/dist/css/bootstrap.min.css"
import "../../css/App.css"

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import React from "react";
import { Container } from "react-bootstrap";
import GraphsAggregatedContainer from "./GraphsAggregatedContainer";
import GraphsContainer from "./GraphsContainer";


function Results({results,triggerPlotResults}) {

    if (!triggerPlotResults) {
        return <Container fluid className="sec-level py-2 my-3">Waiting for user input...</Container>
    }

    const MAX_ITERATIONS = 100000; //WARNING: this is also hardcoded in computeResults.js as maxIterations and computeWeapon()

    //Turns discrete data into percentage
    function prepareSingleResult(result,maxIterations){
        const preparedResults = {}
        let cumulativeProbability = 100
        const cumulativeResults = {}
            let sum = 0
            for (let [key,value] of Object.entries(result)) {
                sum += parseInt(key)*parseInt(value)
                const prob = value*100/maxIterations
                preparedResults[parseInt(key)] = prob
                cumulativeResults[parseInt(key)] = cumulativeProbability;
                cumulativeProbability -= prob
            }
            //TODO: media mal calculada
        return {avg: sum / maxIterations, data: preparedResults, cumulative: cumulativeResults}
    }

    //n is number of aggregated results
    function prepareResults(n){
        const preparedResultsArray = []
        results.map((weaponResult) => {
            const preparedWeaponResult = {}
            //typeOfResult is attackResults, hitResults, etc
            for (let [typeOfResult,value] of Object.entries(weaponResult)) {
                preparedWeaponResult[typeOfResult] = prepareSingleResult(value,n*MAX_ITERATIONS)
            }
            preparedResultsArray.push(preparedWeaponResult)
        })
        return preparedResultsArray
    }

    function getTotalAverages(preparedAggregatedResults) {
        let avgAttacks = 0
        let avgHits = 0
        let avgWounds = 0
        let avgFailedSaves = 0
        let avgDamage = 0
        let avgKilledModels = 0
        preparedAggregatedResults.map((preparedResult)=>{
            avgAttacks += preparedResult.attackResults.avg
            avgHits += preparedResult.hitResults.avg
            avgWounds += preparedResult.woundResults.avg
            avgFailedSaves += preparedResult.savesResults.avg
            avgDamage += preparedResult.totalDamage.avg
            avgKilledModels += preparedResult.killedModels.avg
        })
        return {
            avgAttacks: avgAttacks,
            avgHits: avgHits,
            avgWounds: avgWounds,
            avgFailedSaves: avgFailedSaves,
            avgDamage: avgDamage,
            avgKilledModels: avgKilledModels,
        }
    }

    //TODO: Instead of doing this an alternative could be getting the aggregated results by dividing by n.
    //This could bring floating point errors?
    const preparedSingleResults = prepareResults(1)
    const preparedAggregatedResults = prepareResults(results.length)
    console.log(preparedSingleResults)
    const totalAverages = getTotalAverages(preparedAggregatedResults)


    return (
        <Container fluid className="my-3">
            {/*TODO: cambiar el número de columnas cuando todo este listo*/}
            <Row xs={1} xl={2}>
                <Col>
                    <GraphsAggregatedContainer results = {preparedAggregatedResults} totalAverages={totalAverages}/>
                </Col>
                <Col>
                    <GraphsContainer results = {preparedSingleResults}/>
                </Col>
            </Row>
        </Container>
    )
}

export default Results;