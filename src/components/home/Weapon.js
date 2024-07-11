import "bootstrap/dist/css/bootstrap.min.css"
import "../../css/Weapon.css"
import "../../css/App.css"

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button, FormCheck, Accordion, Container, useAccordionButton } from "react-bootstrap";

import upArrowIcon from "../../img/arrow-up.svg"
import downArrowIcon from "../../img/arrow-down.svg"
import closeIcon from "../../img/x.svg"

function BasicWeaponForm ({index,setWeapons,value,weaponErrors}) {

  function handleChange(event) {
    const {name,value} = event.target;
    //TODO: borrar
    // console.log(`Nombre ${name} y ${value}`);
    setWeapons(w => {
      //TODO: esta linea se puede juntar con la anterior?
      const newState = [...w];
      newState[index] = {...newState[index], [name]: value};
      return newState;
      }
    )
  }

  return (
    <Form className="BasicWeaponForm p-2">
            <Row xs={2} sm={3} xxl={6} className="mx-0">
              <Col className="px-1">
                  <Form.Group className="mb-3" controlId="copies">
                    <Form.Label>Copies</Form.Label>
                    <Form.Control name = "copies" 
                                  type="text"
                                  className="light-input"
                                  onChange={handleChange}
                                  value = {value.copies}
                                  isInvalid = {weaponErrors.copies}
                    ></Form.Control>
                    <Form.Control.Feedback type = "invalid">This is a number!</Form.Control.Feedback>
                  </Form.Group>
              </Col>
              <Col className="px-1">
                <Form.Group className="mb-3" controlId="attacks">
                  <Form.Label>A</Form.Label>
                  <Form.Control name = "attacks" 
                                type="text"
                                onChange={handleChange}
                                value = {value.attacks}
                                isInvalid = {weaponErrors.attacks}
                  ></Form.Control>
                  <Form.Control.Feedback type = "invalid">Format: 2, d6, D3, 1d6+3</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col className="px-1">
                <Form.Group className="mb-3" controlId="weaponSkill">
                  <Form.Label>BS/WS</Form.Label>
                  <Form.Select  name="weaponSkill" 
                                onChange={handleChange} 
                                value={value.weaponSkill}
                                isInvalid = {weaponErrors.weaponSkill}
                  >
                    <option value={1}>Auto Hit</option>
                    <option value={6}>+6</option>
                    <option value={5}>+5</option>
                    <option value={4}>+4</option>
                    <option value={3}>+3</option>
                    <option value={2}>+2</option>
                    <option value={-1}>Choose one</option>
                  </Form.Select>
                  <Form.Control.Feedback type = "invalid">Required!</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col className="px-1">
                <Form.Group className="mb-3" controlId="strenght">
                  <Form.Label>S</Form.Label>
                  <Form.Control name = "strenght" 
                                type="text"
                                onChange={handleChange}
                                value={value.strenght}
                                isInvalid = {weaponErrors.strenght}
                  ></Form.Control>
                  <Form.Control.Feedback type = "invalid">This is a number!</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col className="px-1">
                <Form.Group className="mb-3" controlId="armorPen">
                  <Form.Label>AP</Form.Label>
                  <Form.Select  
                                name="armorPen" 
                                onChange={handleChange} 
                                value={value.armorPen}
                                isInvalid = {weaponErrors.armorPen}
                  >
                    <option value={0}>0</option>
                    <option value={1}>-1</option>
                    <option value={2}>-2</option>
                    <option value={3}>-3</option>
                    <option value={4}>-4</option>
                    <option value={5}>-5</option>
                    <option value={-1}>Choose one</option>
                  </Form.Select>
                  <Form.Control.Feedback type = "invalid">Required!</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col className="px-1">
                <Form.Group className="mb-3" controlId="damage">
                  <Form.Label>D</Form.Label>
                  <Form.Control name = "damage" 
                                type="text"
                                onChange={handleChange}
                                value={value.damage}
                                isInvalid = {weaponErrors.damage}
                  ></Form.Control>
                  <Form.Control.Feedback type = "invalid">Format: 2, d6, D3, 1d6+3</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Form>
  )
}

function AdvancedWeaponForm({index,setWeapons,value}) {


  function handleChange(event) {
    const {name,value} = event.target;
    //TODO: borrar
    // console.log(`Nombre ${name} y ${value}`);
    setWeapons(w => {
      //TODO: esta linea se puede juntar con la anterior?
      const newState = [...w];
      newState[index] = {...newState[index], [name]: value};
      return newState;
      }
    )
  }

  function handleCheckboxChange(event) {
    const checked = event.target.checked;
    const name = event.target.name;
    //TODO: borrar
    // console.log(`Nombre ${name} y ${checked}`);
    setWeapons(w => {
      //TODO: esta linea se puede juntar con la anterior?
      const newState = [...w];
      newState[index] = {...newState[index], [name]: checked};
      return newState;
      }
    );
  }

  return (
      <Form className="AdvancedWeaponForm px-2">
        <Row xs={2} md={3} xxl={5} className="align-items-center">
          <Col xs={{order: 1}} md={{order: 0}} xl={{order: 0}} className="px-1">
            <Form.Group className="mb-3" controlId="rapidFire">
              <Form.Select 
                            name="rapidFire" 
                            onChange={handleChange}
                            value={value.rapidFire}
              >
                <option value={0}>No Rapid Fire</option>
                <option value={1}>[Rapid Fire 1]</option>
                <option value={2}>[Rapid Fire 2]</option>
                <option value={3}>[Rapid Fire 3]</option>
                <option value={4}>[Rapid Fire 4]</option>
                <option value={5}>[Rapid Fire 5]</option>
                <option value={6}>[Rapid Fire 6]</option>
                <option value={9}>[Rapid Fire 9]</option>
                <option value={10}>[Rapid Fire 10]</option>
                <option value={11}>[Rapid Fire D6]</option>
                <option value={12}>[Rapid Fire D6+3]</option>
                <option value={13}>[Rapid Fire D3]</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={{order: 0}} md={{order: 0}} xxl={{order: 0}} className="px-1">
            <Form.Group className="mb-3" controlId="toHitMod">
              <Form.Select  name="toHitMod" 
                            onChange={handleChange} 
                            value={value.toHitMod}
              >
                <option value={0}>No mod to hit</option>
                <option value={1}>+1 to hit</option>
                <option value={-1}>-1 to hit</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={{order: 0}} md={{order: 0}} xxl={{order: 0}} className="px-1">
            <Form.Group className="mb-3" controlId="toWoundMod">
              <Form.Select  name="toWoundMod" 
                            onChange={handleChange} 
                            value={value.toWoundMod}
              >
                <option value={0}>No mod to wound</option>
                <option value={1}>+1 to wound</option>
                <option value={-1}>-1 to wound</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={{order: 3}} md={{order: 1}} xxl={{order: 0}}>
            <Form.Group className="mb-3 text-start" controlId="ignoreCover">
              <FormCheck 
                name="ignoreCover"
                type="checkbox"
                id="ignoreCover"
                label="[Ignore Cover]"
                onClick={handleCheckboxChange}
                checked={value.ignoreCover}
                readOnly
              />
            </Form.Group>
          </Col>
          <Col xs={{order: 2}} md={{order: 1}} xxl={{order: 0}} className="px-1">
            <Form.Group className="mb-3" controlId="anti">
              <Form.Select  name="anti" 
                            onChange={handleChange} 
                            value={value.anti}
              >
                <option value={99}>No [Anti X+]</option>
                <option value={2}>[Anti 2+]</option>
                <option value={3}>[Anti 3+]</option>
                <option value={4}>[Anti 4+]</option>
                <option value={5}>[Anti 5+]</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={{order: 1}} md={{order: 0}} xxl={{order: 1}} className="px-1">
            <Form.Group className="mb-3" controlId="sustainedHits">
              <Form.Select 
                            name="sustainedHits" 
                            onChange={handleChange}
                            value={value.sustainedHits}
              >
                <option value={0}>No Sustained Hits</option>
                <option value={1}>[Sustained Hits 1]</option>
                <option value={2}>[Sustained Hits 2]</option>
                <option value={3}>[Sustained Hits 3]</option>
                <option value={11}>[Sustained Hits D3]</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={{order: 0}} md={{order: 0}} xxl={{order: 1}} className="px-1">
            <Form.Group className="mb-3" controlId="toHitReroll">
              <Form.Select  name="toHitReroll" 
                            onChange={handleChange} 
                            value={value.toHitReroll}
              >
                <option value={0}>No hit reroll</option>
                <option value={1}>Reroll 1s</option>
                <option value={2}>Reroll failed</option>
                <option value={3}>Reroll non-crit</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={{order: 0}} md={{order: 0}} xxl={{order: 1}} className="px-1">
            <Form.Group className="mb-3" controlId="toWoundReroll">
              <Form.Select  name="toWoundReroll" 
                            onChange={handleChange} 
                            value={value.toWoundReroll}
              >
                <option value={0}>No wound reroll</option>
                <option value={1}>Reroll 1s</option>
                <option value={2}>Reroll failed</option>
                <option value={3}>Reroll non-crit</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={{order: 4}} xxl={{order: 1}}>
          </Col>
          <Col xs={{order: 2}} md={{order: 1}} xxl={{order: 1}} className="px-1">
            <Form.Group className="mb-3" controlId="melta">
              <Form.Select  name="melta" 
                            onChange={handleChange} 
                            value={value.melta}
              >
                <option value={0}>No Melta</option>
                <option value={2}>[Melta 2]</option>
                <option value={3}>[Melta 3]</option>
                <option value={4}>[Melta 4]</option>
                <option value={6}>[Melta 6]</option>
                <option value={11}>[Melta D3]</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={{order: 3}} md={{order: 2}} xxl={{order: 2}} >
              <Form.Group className="mb-3 text-start" controlId="blast">
                <FormCheck 
                  name="blast"
                  type="checkbox"
                  id="blast"
                  label="[Blast]"
                  onClick={handleCheckboxChange}
                  checked={value.blast}
                  readOnly
                />
              </Form.Group>
          </Col>
          <Col xs={{order: 3}} md={{order: 2}} xxl={{order: 2}}>
              <Form.Group className="mb-3 text-start" controlId="lethalHits">
                <FormCheck
                  name="lethalHits"
                  type="checkbox"
                  id="lethalHits"
                  label="[Lethal Hits]"
                  onClick={handleCheckboxChange}
                  checked={value.lethalHits}
                  readOnly
                />
              </Form.Group>
          </Col>
          <Col xs={{order: 3}} md={{order: 2}} xxl={{order: 2}}>
            <Form.Group className="mb-3 text-start" controlId="devastatingWounds">
                <FormCheck 
                  name="devastatingWounds"
                  type="checkbox"
                  id="devastatingWounds"
                  label="[Dev Wounds]"
                  onClick={handleCheckboxChange}
                  checked={value.devastatingWounds}
                  readOnly
                />
              </Form.Group>
          </Col>
          <Col md={{order: 4}} xl={{order: 2}}>
          </Col>
          <Col xs={{order: 3}} md={{order: 2}} xxl={{order: 2}}>
              <Form.Group className="mb-3 text-start" controlId="mortalWounds">
                <FormCheck 
                  name="mortalWounds"
                  type="checkbox"
                  id="mortalWounds"
                  label="Mortal Wounds"
                  onClick={handleCheckboxChange}
                  checked={value.mortalWounds}
                  readOnly
                />
              </Form.Group>
          </Col>
        </Row>
      </Form>
  );
}


function Weapon ({index,setWeapons,value,numOfWeapons,weaponErrors,setErrors,setResults}) {

  function handleDeleteWeapon(){
    setWeapons(w => {
      let array = [...w];
      array.splice(index,1);
      return array;
    })
    setResults(r => {
      let array = [...r];
      array.splice(index,1);
      return array;
    })
    setErrors(e => {
      let newErrors = {...e};
      newErrors.weapons = [...newErrors.weapons];
      newErrors.weapons.splice(index, 1); 
      return newErrors;
    });
    
  }

  function handleMoveWeaponUp(){
      //ATENTION: bootstrap-react prevents onClick handlers from firing on disabled buttons. (Doing that in the component) Do we trust this?
      //Maybe it would be a good idea to check if the index>= 0 anyway. I did that in the disabled argument of the button
      setWeapons(w => {
        let array = [...w]
        array[index-1]=array.splice(index,1,array[index-1])[0]
        return array
      })
  }

  function handleMoveWeaponDown(){
    //ATENTION: bootstrap-react prevents onClick handlers from firing on disabled buttons. (Doing that in the component) Do we trust this?
    //Maybe it would be a good idea to check if the index>= numOfWeapons - 1 anyway. I did that in the disabled argument of the button
    setWeapons(w => {
      let array = [...w]
      array[index+1]=array.splice(index,1,array[index+1])[0]
      return array
    })
}

    return (
      <Container className="p-2 my-2 third-level">
          <Row>
            {/* <Col xs="auto">
              <span>{index}</span>
            </Col> */}
            <Col>
              <Button className="accordionButton" variant="outline-primary" onClick={useAccordionButton(index)}>
                {index+1} {value.name}
              </Button>
            </Col>
            <Col xs="auto">
            <Button className="moveWeaponUpButton" variant="outline-primary" onClick={handleMoveWeaponUp} disabled={index<=0}><img src = {upArrowIcon} alt="move up button icon"/></Button>
            <Button className="moveWeaponDownButton" variant="outline-primary" onClick={handleMoveWeaponDown} disabled={index>=numOfWeapons-1}><img src = {downArrowIcon} alt="move up button icon"/></Button>
            <Button className="deleteWeaponButton" variant="outline-primary" onClick={handleDeleteWeapon}><img src = {closeIcon} alt="close button icon"/></Button>
            </Col>
          </Row>
          <Row>
            <BasicWeaponForm
              index = {index} 
              setWeapons = {setWeapons} 
              value = {value}
              weaponErrors = {weaponErrors}
            />
          </Row>
        <Accordion.Collapse eventKey={index}>
          <AdvancedWeaponForm 
              index = {index} 
              setWeapons = {setWeapons}
              value = {value}
          />
        </Accordion.Collapse>
      </Container>
    )
}


export default Weapon;