import "bootstrap/dist/css/bootstrap.min.css"
import "../../css/App.css"
import "../../css/GraphsContainerBoth.css"

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React from "react";
import { Container } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import GraphsAggregated from "./GraphsAggregated";


function GraphsAggregatedContainer({results,totalAverages}) {

    return (
        <Container className="my-3 sec-level" fluid >  
                <Tabs
                    defaultActiveKey="killedModelsTab"
                    id="graphs-aggregated-tabs"
                    className="mb-3"
                    fill
                >
                    <Tab eventKey="attackResultsTab" title="Attacks">
                        <Row xs={1} xl={2} className="align-items-center text-start">
                            <Col>
                                <span>Average attacks: {totalAverages.avgAttacks.toFixed(2)}</span>
                            </Col>
                            <Col>
                                <GraphsAggregated results={results} typeOfResult="attackResults"/>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="hitResultsTab" title="Hits">
                        <Row xs={1} xl={2} className="align-items-center text-start">
                            <Col>
                                <span>Average hits: {totalAverages.avgHits.toFixed(2)}</span>
                            </Col>
                            <Col>
                                <GraphsAggregated results={results} typeOfResult="hitResults"/>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="woundResults-tab" title="Wounds">
                        <Row xs={1} xl={2} className="align-items-center text-start">
                            <Col>
                                <span>Average wounds: {totalAverages.avgWounds.toFixed(2)}</span>
                            </Col>
                            <Col>
                                <GraphsAggregated results={results} typeOfResult="woundResults"/>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="savesResultsTab" title="Saves">
                        <Row xs={1} xl={2} className="align-items-center text-start">
                            <Col>
                                <span>Average failed saves: {totalAverages.avgFailedSaves.toFixed(2)}</span>
                            </Col>
                            <Col>
                                <GraphsAggregated results={results} typeOfResult="savesResults"/>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="totalDamageTab" title="Damage">
                        <Row xs={1} xl={2} className="align-items-center text-start">
                            <Col>
                                <span className="d-inline-block ">Average damage*: {totalAverages.avgDamage.toFixed(2)}</span>
                                <span className="d-inline-block">*includes all damage before damage allocation and feel no pain.</span>
                            </Col>
                            <Col>
                                <GraphsAggregated results={results} typeOfResult="totalDamage"/>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="killedModelsTab" title="Kills">
                        <Row xs={1} xl={2} className="align-items-center text-start">
                            <Col>
                                <span>Average models killed: {totalAverages.avgKilledModels.toFixed(2)}</span>
                            </Col>
                            <Col>
                                <GraphsAggregated results={results} typeOfResult="killedModels"/>
                            </Col>
                        </Row>
                    </Tab>
                </Tabs>
        </Container>
    )
}

export default GraphsAggregatedContainer;