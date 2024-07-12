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

    function prepareSingleResult(result,maxIterations){
        const preparedResultObject = {}
            let sum = 0
            for (let [key,value] of Object.entries(result)) {
                sum += parseInt(key)*parseInt(value)
                preparedResultObject[parseInt(key)] = value*100/maxIterations
            }
            //TODO: media mal calculada
        return {avg: sum / maxIterations, data: preparedResultObject}
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

    //TODO: Instead of doing this an alternative could be getting the aggregated results by dividing by n.
    //This could bring floating point errors?
    const preparedSingleResults = prepareResults(1)
    const preparedAggregatedResults = prepareResults(results.length)


    return (
        <Container fluid className="my-3">
            {/*TODO: cambiar el número de columnas cuando todo este listo*/}
            <Row xs={1} xl={1}>
                <Col>
                    <GraphsAggregatedContainer results = {preparedAggregatedResults}/>
                </Col>
                <Col>
                    <GraphsContainer results = {preparedSingleResults}/>
                </Col>
            </Row>
        </Container>
    )
}

export default Results;