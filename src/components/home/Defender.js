import "bootstrap/dist/css/bootstrap.min.css"
import "../../css/App.css"

import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { FormCheck, Container } from "react-bootstrap";

import React, {useContext, useState} from "react";

import { DefenderContext } from "./Home.js";
import UnitImport from "./UnitImport.js";

// import targetIcon from "../../img/target.svg"

function Defender () {

    const [defender, setDefender, errors,setErrors] = useContext(DefenderContext)

    const [unitSearchShow,setUnitSearchShow] = useState(false)

    // console.log("Defender errors")
    // console.log(errors.defender)

    function handleChange(event) {
        const {name,value} = event.target;
        // console.log(`Nombre ${name} y ${value}`);
        setDefender(d => ({...d,[name]: value}))
      }
    
    function handleCheckboxChange(event) {
        const name = event.target.name;
        const checked = event.target.checked;
        console.log(`Nombre ${name} y ${checked}`)
        setDefender(d => ({...d,[name]: checked}))
    }

    //TODO: en un futuro cambiar por importar datos del JSON?

    function handleGuardsmanProfile() {
        setDefender({            
            models: 20,
            toughness: 3,
            wounds: 1,
            save: 5,
            inv: 99,
            fnp: 0,
            cover: false,
            stealth: 0,
            fnpVsMort: 0,
            dmgReduction: 0,})
    }
    
    function handleIntercessorProfile() {
        setDefender({            
            models: 10,
            toughness: 4,
            wounds: 2,
            save: 3,
            inv: 99,
            fnp: 0,
            cover: false,
            stealth: 0,
            fnpVsMort: 0,
            dmgReduction: 0,})
    }

    function handleTermiProfile() {
        setDefender({            
            models: 5,
            toughness: 5,
            wounds: 3,
            save: 2,
            inv: 4,
            fnp: 0,
            cover: false,
            stealth: 0,
            fnpVsMort: 0,
            dmgReduction: 0,})
    }

    function handleRhinoProfile() {
        setDefender({            
            models: 1,
            toughness: 9,
            wounds: 10,
            save: 3,
            inv: 99,
            fnp: 0,
            cover: false,
            stealth: 0,
            fnpVsMort: 0,
            dmgReduction: 0,})
    }

    function handleLandRaiderProfile() {
        setDefender({            
            models: 1,
            toughness: 12,
            wounds: 16,
            save: 2,
            inv: 99,
            fnp: 0,
            cover: false,
            stealth: 0,
            fnpVsMort: 0,
            dmgReduction: 0,})
    }

    return(
        <Container className="defenderBox container-sm sec-level pt-3">
            <h1 className="mb-3">{/*<img src = {targetIcon} alt="target icon"/>*/} Target Unit</h1>
            <Button variant="outline-primary" onClick={() => setUnitSearchShow(true)}>
                Import Datasheet
            </Button>
            <UnitImport
                show={unitSearchShow}
                onHide={() => setUnitSearchShow(false)}
                rol="defender"
                rolSetter={setDefender}
                setErrors={setErrors}
            ></UnitImport>
            <Container className="defaultProfiles p-2" >
                <h3>Default Profiles</h3>
                <Button className="m-1 py-2" variant = "outline-primary" onClick = {handleGuardsmanProfile}>Guardsman</Button>
                <Button className="m-1 py-2" variant = "outline-primary" onClick = {handleIntercessorProfile}>Intercessor</Button>
                <Button className="m-1 py-2" variant = "outline-primary" onClick = {handleTermiProfile}>Terminator</Button>
                <Button className="m-1 py-2" variant = "outline-primary" onClick = {handleRhinoProfile}>Rhino</Button>
                <Button className="m-1 py-2" variant = "outline-primary" onClick = {handleLandRaiderProfile}>Land Raider</Button>
            </Container>
            <Form className="defenderForm">
                <Row xs={2} md={3} xl={5} className="mx-0 align-items-center">
                    <Col className="px-1">
                        <Form.Group className="mb-3" controlId="models">
                            <Form.Label>Nº of models</Form.Label>
                            <Form.Control name = "models"
                                            type="text"
                                            onChange={handleChange}
                                            value={defender.models}
                                            isInvalid = {errors.defender.models}
                            ></Form.Control>
                            <Form.Control.Feedback type = "invalid">This is a number!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col className="px-1">
                        <Form.Group className="mb-3" controlId="toughness">
                            <Form.Label>T</Form.Label>
                            <Form.Control name = "toughness" 
                                            type="text"
                                            onChange={handleChange}
                                            value={defender.toughness}
                                            isInvalid = {errors.defender.toughness}
                            ></Form.Control>
                            <Form.Control.Feedback type = "invalid">This is a number!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col className="px-1">
                        <Form.Group className="mb-3" controlId="wounds">
                            <Form.Label>W</Form.Label>
                            <Form.Control name = "wounds" 
                                            type="text"
                                            /*defaultValue={value.attacks} NO HE PROBADO SI FUNCIONA*/
                                            onChange={handleChange}
                                            value={defender.wounds}
                                            isInvalid = {errors.defender.wounds}
                            ></Form.Control>
                            <Form.Control.Feedback type = "invalid">This is a number!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col className="px-1">
                        <Form.Group className="mb-3" controlId="save">
                            <Form.Label>Save</Form.Label>
                            <Form.Select  name="save" 
                                            onChange={handleChange} 
                                            value={defender.save}
                                            isInvalid = {errors.defender.save}
                            >
                                <option value={6}>6+</option>
                                <option value={5}>5+</option>
                                <option value={4}>4+</option>
                                <option value={3}>3+</option>
                                <option value={2}>2+</option>
                                <option value={-1}>Choose one</option>
                            </Form.Select>
                            <Form.Control.Feedback type = "invalid">Required!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col className="px-1"> 
                        <Form.Group className="mb-3" controlId="inv">
                            <Form.Label>Inv</Form.Label>
                                <Form.Select  name="inv" 
                                                onChange={handleChange} 
                                                value={defender.inv}
                                >
                                    <option value={99}>No Inv</option>
                                    <option value={6}>6++</option>
                                    <option value={5}>5++</option>
                                    <option value={4}>4++</option>
                                    <option value={3}>3++</option>
                                    <option value={2}>2++</option>
                                </Form.Select>
                            </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3 text-start" controlId="cover">
                            <FormCheck 
                                name="cover"
                                type="checkbox"
                                id="cover"
                                label="Cover"
                                onClick={handleCheckboxChange}
                                checked={defender.cover}
                                readOnly
                            />
                        </Form.Group>
                    </Col>
                    <Col className="px-1">
                        <Form.Group className="mb-3" controlId="fnp">
                            <Form.Select  name="fnp" 
                                            onChange={handleChange} 
                                            value={defender.fnp}
                            >
                                <option value={0}>No FnP</option>
                                <option value={6}>6+ FnP</option>
                                <option value={5}>5+ FnP</option>
                                <option value={4}>4+ FnP</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col className="px-1">
                        <Form.Group className="mb-3" controlId="fnpVsMort">
                            <Form.Select  name="fnpVsMort" 
                                            onChange={handleChange} 
                                            value={defender.fnpVsMort}
                            >
                                <option value={0}>No FnP vs mortals</option>
                                <option value={6}>6+ FnP vs Mort</option>
                                <option value={5}>5+ FnP vs Mort</option>
                                <option value={4}>4+ FnP vs Mort</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3 text-start" controlId="stealth">
                            <FormCheck 
                                name="stealth"
                                type="checkbox"
                                id="stealth"
                                label="NYI Stealth"
                                onClick={handleCheckboxChange}
                                checked={defender.stealth}
                                readOnly
                                disabled
                            />
                        </Form.Group>
                    </Col>
                    <Col className="px-1">
                        <Form.Group className="mb-3" controlId="dmgReduction">
                            <Form.Select  name="dmgReduction" 
                                            onChange={handleChange} 
                                            value={defender.dmgReduction}
                                            disabled
                            >
                                <option value={0}>NYI DMG reduction</option>
                                <option value={1}>-1 Damage</option>
                                <option value={2}>-2 Damage</option>
                                <option value={3}>-3 Damage</option>
                                <option value={3}>Half Damage</option>
                                {/*TODO:implementar esto
                                <option value={3}>Negate???</option>*/}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default Defender;