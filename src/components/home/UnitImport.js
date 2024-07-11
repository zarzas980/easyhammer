import "bootstrap/dist/css/bootstrap.min.css"

import React, {useState,useEffect} from "react";


import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Button, Modal } from "react-bootstrap";


function UnitImport({show,onHide,rol,rolSetter, setErrors, setResults, resultsTemplate}) {

    const [selectedFaction, setSelectedFaction] = useState('');
    const [selectedUnit, setSelectedUnit] = useState('');
    const [factionData, setFactionData] = useState(null);


    function handleImport(){
      if(selectedUnit!==""){
        const data = factionData[selectedUnit][rol]
        rolSetter(data)
        setErrors(e => {
          const obj = {...e}
          //The errors state has this format
          //useState({weapons: [{}],defender: {}})
          obj[rol] = rol==="defender" ? {} : Array(data.length).fill({})
          return obj
        })
        if(rol==="weapons"){
          setResults(Array(data.lenght).fill(resultsTemplate))
        }
        onHide()
      }
    }

    function handleFactionChange(event){
      setSelectedFaction(event.target.value);
      setSelectedUnit(''); // Reset unit when faction changes
      setFactionData(null); // Reset faction data when faction changes
    };
  
    function handleUnitChange(event){
      const unitId = event.target.value;
      setSelectedUnit(unitId);
    };
  
    useEffect(() => {
      if (selectedFaction) {
        const loadFactionData = async () => {
          try {
            const data = await import(`../../data/datasheets/${selectedFaction}.json`);
            setFactionData(data.default);
          } catch (error) {
            console.error('Error loading faction data:', error);
          }
        };
        loadFactionData();
      }
    }, [selectedFaction]);
  
    const factions = {
      custodes: "Adeptus Custodes",
      mechanicus: "Adeptus Mechanicus",
      sisters: "Adepta Sororitas",
      agents: "Agents of the Imperium",
      aeldari: "Aeldari",
      astraMilitarum: "Astra Militarum",
      chaosKnights: "Chaos Knights",
      csm: "Chaos Space Marines",
      demons: "Daemons",
      deathGuard: "Death Guard",
      drukhari: "Drukhari",
      cult: "Genestealer Cult",
      greyKnights: "Grey Knights",
      impKnights: "Imperial Knights",
      votann: "Leagues of Votann",
      necrons: "Necrons",
      orks: "Orks",
      spaceMarines: "Space Marines",
      tau: "T'au Empire",
      titans: "Titans",
      thousandSons: "Thousand Sons",
      tyranids: "Tyranids",
      fortifications: "Fortifications",
      worldEaters: "World Eaters"
    };
    
    // Order the object by values alphabetically
    const orderedFactions = Object.fromEntries(
      Object.entries(factions).sort(([, a], [, b]) => a.localeCompare(b))
    );  
    
    const units = factionData ? Object.keys(factionData) : [];
  
    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Select faction and unit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="unitSearch">
            <Row>
              <Form.Group className="mb-3" controlId="factionSelect">
                <Form.Label>Faction</Form.Label>
                <Form.Select  name="factionSelect" 
                              onChange={handleFactionChange} 
                              value={selectedFaction}
                >
                  <option key="" value="">Select a faction</option>
                  {Object.keys(factions).map(fKey => (
                      <option key={fKey} value={fKey}>
                        {factions[fKey]}
                      </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type = "invalid">Required!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3" controlId="unitSelect">
                <Form.Label>Unit</Form.Label>
                <Form.Select  name="unitSelect" 
                              onChange={handleUnitChange} 
                              value={selectedUnit}
                >
                  <option key="" value="">Select a Unit</option>
                  {units.map((unitID) => (
                    <option key={unitID} value={unitID}>
                      {factionData[unitID].name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type = "invalid">Required!</Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={handleImport}>Import profile</Button>
        </Modal.Footer>
      </Modal>

    );
  };
  

export default UnitImport