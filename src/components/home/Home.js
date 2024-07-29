import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, createContext, useEffect} from "react";

import { Button, Alert, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Attacker from "./Attacker"
import Defender from "./Defender"
import Hero from "./Hero"
import Results from "./Results";
import Disclaimer from "./Disclaimer"

import computeResults from "../../scripts/computeResults";
import validateData from "../../scripts/validateData";

export const DefenderContext = createContext()
export const AttackerContext = createContext()
export const ResultsContext = createContext()

function Home(){

    const weaponTemplate = {
        name: "Custom Weapon",
        copies: "",
        attacks: "",
        weaponSkill: -1,
        strenght: "",
        armorPen: -1,
        damage: "",
        rapidFire: 0,
        sustainedHits: 0,
        toHitMod: 0,
        toWoundMod: 0,
        ignoreCover: false,
        anti: 99,
        melta: 0,
        blast: false,
        toHitReroll: 0,
        toWoundReroll: 0,
        mortalWounds: false,
        lethalHits: false,
        devastatingWounds: false,
        twinLinked: false,
    };

    const defaultDefender = {
        models: "",
        toughness: "",
        wounds: "",
        save: -1,
        inv: 99,
        fnp: 0,
        cover: false,
        stealth: 0,
        fnpVsMort: 0,
        dmgReduction: 0,
    }

    const resultsTemplate = {
        attackResults: {},
        hitResults: {},
        woundResults: {},
        savesResults: {},
        totalDamage: {},
        killedModels: {},
    }


    //TODO: is this good? should we combine weapons, results and error into a single state?
    //Like this consolidated = [{weapon: {}, error: {}, result: {}},...] this is an array of objects. Each object has all the data of the weapon.
    const [defender, setDefender] = useState(defaultDefender)

    const [weapons, setWeapons] = useState([weaponTemplate])

    const [results,setResults] = useState([resultsTemplate])

    const [finalKilledModels, setFinalKilledModels] = useState()

    const [errors, setErrors] = useState({weapons: [{}],defender: {}})

    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const [triggerCompute, setTriggerCompute] = useState(false);

    const [triggerPlotResults, setTriggerPlotResults] = useState(false);

    //Computes the results after the states are updated
    useEffect(() => {
        if (triggerCompute) {
            const finalKilledModelsArray = computeResults(weapons,defender,setResults)
            setFinalKilledModels(finalKilledModelsArray)
            setTriggerCompute(false);  // Reset the trigger
            setTriggerPlotResults(true)
          }
        }, [weapons, defender, results, triggerCompute]);

    //Validates data. If that is correct it sets the triggerCompute state to true. Otherwise it logs that the data is wrong.
    //Rememeber that actual computation of the results is done by the useEffect hook.
    function handleComputeResults() {
        if(validateData(weapons,defender,setWeapons,setErrors)){
            setTriggerCompute(true)
            setShowErrorMessage(false)
        } else {
            setTriggerCompute(false)
            setShowErrorMessage(true)
        }
    }

    return (
        <>  
            <Hero/>
            <Row xs={1} xl={2}>
                <Col>
                    <AttackerContext.Provider value={[weapons,setWeapons,weaponTemplate,errors, setErrors, setResults,resultsTemplate]}>
                        <Attacker/>
                    </AttackerContext.Provider>
                    <div style={{paddingBottom: "20px"}}></div>
                </Col>
                <Col>
                    <DefenderContext.Provider value={[defender, setDefender, errors,setErrors]}>
                        <Defender/>
                    </DefenderContext.Provider>
                    <div style={{paddingBottom: "20px"}}></div>
                    <Disclaimer>
                        <Button variant ="primary" onClick={handleComputeResults}><b>GET RESULTS</b></Button>
                    </Disclaimer>
                    {showErrorMessage && <Alert variant="danger">
                        Ups! There is something wrong with the inputs!
                    </Alert>}
                </Col>       
            </Row>
            <ResultsContext.Provider value={weapons}>
                <Results results={results} triggerPlotResults={triggerPlotResults} defender={defender} finalKilledModels={finalKilledModels}/>
            </ResultsContext.Provider>
        </>
    )
}

export default Home;
