import "bootstrap/dist/css/bootstrap.min.css"
import "../../css/App.css"


import Button from "react-bootstrap/Button";
import { Accordion, Container } from "react-bootstrap";

import React, {useContext, useState} from "react";

import Weapon from "./Weapon.js";
import UnitImport from "./UnitImport.js";
import { AttackerContext } from "./Home.js";

import addWeaponIcon from "../../img/plus.svg"

// import attackerIcon from "../../img/swords.svg"


function Attacker() {

  //TODO: hay que asegurarse que cuando añadamos un arma tome un template
  
  const [weapons, setWeapons,weaponTemplate, errors , setErrors, setResults,resultsTemplate] = useContext(AttackerContext)

  const [unitSearchShow,setUnitSearchShow] = useState(false)

  const renderWeapons = weapons.map((value,index) => 
                    <Weapon key={index}
                            index = {index} 
                            setWeapons = {setWeapons}
                            value = {value}
                            numOfWeapons = {weapons.length}
                            weaponErrors = {errors.weapons[index]}
                            setErrors = {setErrors}
                            setResults = {setResults}
                    ></Weapon>
  )

  // Adds a weapon to the weapons array and the errors.weapons array
  function handleAddWeapon() {
    setWeapons(w => [...w,weaponTemplate]);
    setErrors(e => {
      const obj = {...e}
      obj.weapons = [...obj.weapons,{}]
      return obj
    })
    setResults(r => [...r,resultsTemplate])
  }


  return (
    <Container className="AttackerContainer sec-level py-3">
        <h1 className="mb-3">{/*<img src = {attackerIcon} alt="attacker icon"/>*/}  Attacking Unit</h1>
        <Button variant="outline-primary" onClick={() => setUnitSearchShow(true)}>
                Import Datasheet
        </Button>
        {/*TODO: esto tiene que estar aqui y también en defensor?
        No podríamos crear una función que llame al componente o algo?*/}
        <UnitImport
            show={unitSearchShow}
            onHide={() => setUnitSearchShow(false)}
            rol="weapons"
            rolSetter={setWeapons}
            setErrors={setErrors}
            setResults={setResults}
            resultsTemplate={resultsTemplate}
        ></UnitImport>
        <Accordion defaultActiveKey={0}>
          {renderWeapons}
        </Accordion>
        <Button variant = "outline-primary" onClick = {handleAddWeapon}><img src = {addWeaponIcon} alt="add weapon icon"/></Button>
    </Container>
  );

}


export default Attacker;