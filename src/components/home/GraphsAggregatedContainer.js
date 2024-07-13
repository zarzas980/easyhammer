import "bootstrap/dist/css/bootstrap.min.css"
import "../../css/App.css"

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React from "react";
import { Container } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import GraphsAggregated from "./GraphsAggregated";


function GraphsAggregatedContainer({results}) {

    return (
        <Container className="my-3 sec-level" fluid >  
                <Tabs
                    defaultActiveKey="killedModelsTab"
                    id="graphs-aggregated-tabs"
                    className="mb-3"
                    fill
                >
                    <Tab eventKey="attackResultsTab" title="Attacks">
                        <Row>
                            <Col>
                                <span>Aqui van las medias</span>
                            </Col>
                            <Col>
                                <GraphsAggregated results={results} typeOfResult="attackResults"/>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="hitResultsTab" title="Hits">
                        <Row>
                            <Col>
                                <span>Aqui van las medias</span>
                            </Col>
                            <Col>
                                <GraphsAggregated results={results} typeOfResult="hitResults"/>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="woundResults-tab" title="Wounds">
                        <Row>
                            <Col>
                                <span>Aqui van las medias</span>
                            </Col>
                            <Col>
                                <GraphsAggregated results={results} typeOfResult="woundResults"/>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="savesResultsTab" title="Saves">
                        <Row>
                            <Col>
                                <span>Aqui van las medias</span>
                            </Col>
                            <Col>
                                <GraphsAggregated results={results} typeOfResult="savesResults"/>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="totalDamageTab" title="Damage">
                        <Row>
                            <Col>
                                <span>Aqui van las medias</span>
                            </Col>
                            <Col>
                                <GraphsAggregated results={results} typeOfResult="totalDamage"/>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="killedModelsTab" title="Kills">
                        <Row>
                            <Col>
                                <span>Aqui van las medias</span>
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