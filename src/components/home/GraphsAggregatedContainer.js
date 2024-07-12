import "bootstrap/dist/css/bootstrap.min.css"
import "../../css/App.css"

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import React from "react";
import GraphsAggregated from "./GraphsAggregated";
import { Container } from "react-bootstrap";


function GraphsAggregatedContainer({results}) {

    return (
        <Container className="my-3 sec-level" fluid >  
            <Row xs={1} xl={2}>
                <h4>Aggregated Results</h4>  
                <Row xs={1} md={2}>
                    <Col>
                        <GraphsAggregated results={results} typeOfResult="attackResults"/>
                    </Col>
                    <Col>
                        <GraphsAggregated results={results} typeOfResult="hitResults"/>
                    </Col>
                    <Col>
                        <GraphsAggregated results={results} typeOfResult="woundResults"/>
                    </Col>
                    <Col>
                        <GraphsAggregated results={results} typeOfResult="savesResults"/>
                    </Col>
                    <Col>
                        <GraphsAggregated results={results} typeOfResult="totalDamage"/>
                    </Col>
                    <Col>
                        <GraphsAggregated results={results} typeOfResult="killedModels"/>
                    </Col>
                </Row>
            </Row>
        </Container>
    )
}

export default GraphsAggregatedContainer;