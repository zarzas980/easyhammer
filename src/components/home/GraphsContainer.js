import "bootstrap/dist/css/bootstrap.min.css"
import "../../css/App.css"

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import React, {useContext} from "react";
import { ResultsContext } from "./Home";
import Graphs from "./Graphs";
import { Container } from "react-bootstrap";

function GraphsContainer() {
    const [weapons,results,triggerPlotResults] = useContext(ResultsContext);

    if (!triggerPlotResults) {
        return <Container fluid className="sec-level py-2 my-3">Waiting for user input...</Container>
    }

    const maxIterations = 100000; //WARNING: this is also hardcoded in computeResults.js as maxIterations and computeWeapon()

    function prepareSingleResult(result){
        const preparedResultObject = {}
            let sum = 0
            for (let [key,value] of Object.entries(result)) {
                sum += parseInt(key)*parseInt(value)
                preparedResultObject[parseInt(key)] = value*100/maxIterations
            }
        return {ready: true, avg: sum / maxIterations, data: preparedResultObject}
    }

    function prepareResults(){
        const preparedResultsArray = []
        results.map((weaponResult) => {
            const preparedWeaponResult = {}
            //These are attackResults, hitResults, etc
            for (let [typeOfResult,value] of Object.entries(weaponResult)) {
                preparedWeaponResult[typeOfResult] = prepareSingleResult(value)
            }
            preparedResultsArray.push(preparedWeaponResult)
        })
        return preparedResultsArray
    }

    const preparedResults = prepareResults()

    const renderResults = preparedResults.map((result,index) => 
        <Container key={index} className="mb-2 sec-level">
            <Col>
                <h4>{index+1} {weapons[index].name}</h4>  
                <Row xs={1} md={2}>
                    <Col>
                        <Graphs result={result.attackResults} stat = "Attacks" label="Num of Attacks"/>
                    </Col>
                    <Col>
                        <Graphs result={result.hitResults} stat = "Hits" label="Num of Hits"/>
                    </Col>
                    <Col>
                        <Graphs result={result.woundResults} stat = "Wounds" label="Num of Wounds"/>
                    </Col>
                    <Col>
                        <Graphs result={result.savesResults} stat = "Failed Saves" label="Num of Failed Saves"/>
                    </Col>
                    <Col>
                        <Graphs result={result.totalDamage} stat = "Damage" label="Total Damage"/>
                    </Col>
                    <Col>
                        <Graphs result={result.killedModels} stat = "Killed Models" label="Killed Models"/>
                    </Col>
                </Row>
            </Col>
        </Container>
    )

    return (
        <Container className="my-3">  
            <Row xs={1} xl={2}>
                {renderResults}
            </Row>
        </Container>
    )
}

export default GraphsContainer;