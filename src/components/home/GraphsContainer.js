import "bootstrap/dist/css/bootstrap.min.css"
import "../../css/App.css"
import "../../css/GraphsContainerBoth.css"

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import React, {useContext} from "react";
import { ResultsContext } from "./Home";
import Graphs from "./Graphs";
import { Container } from "react-bootstrap";


function GraphsContainer({results}) {

    const weapons = useContext(ResultsContext);

    const renderResults = results.map((result,index) => 
            <Tab key={index} eventKey={index} title = {`${index+1} ${weapons[index].name}`}>
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
            </Tab>
    )

    return (
        <Container fluid className="my-3 sec-level">  
            <Tabs
            defaultActiveKey={0}
            id="graphs-tabs"
            className="mb-3"
            fill
            >
                {renderResults}
            </Tabs>
        </Container>
    )
}

export default GraphsContainer;