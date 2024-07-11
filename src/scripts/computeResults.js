function rollDie( n = 6){
    return Math.floor(Math.random()*n) + 1;
}


function computeWeapon(weapon,index,defender,setResults,excessDamageArray) {

    let numOfAttacks = 0;
    let numOfHits = 0;
    let numOfWounds = 0;
    let numOfFailedSaves = 0;
    let numOfKilledModels = 0;
    let totalDmg = 0;

    const newAttackResults = {}
    const newHitResults = {}
    const newWoundResults = {}
    const newSavesResults = {}
    const newNumOfKilledModels = {}
    const newTotalDmg = {}

    // console.log(weapon)
    // console.log("Weapon Skill " + weapon.weaponSkill)

    //Rolls a random stat such that nDm+x. ie, 1D6+1, 2D3
    //Returns the result of the roll
    function rollRandomStat(n, m, x){
        let result = 0
        for (let i = 0; i<n; i++){
            result += parseInt(rollDie(m))
        }
        result += x
        return result;
    }

    function getRapidFire() {
        //If rapid fire < 11 then rapid fire is constant. Values over 11 are for random rapid fire
        const rf = parseInt(weapon.rapidFire);
        if(rf<11) {
            return rf;
        }else {
            switch(rf){
                case 11:
                    return rollRandomStat(1,6,0); //1d6
                case 12: 
                    return rollRandomStat(1,6,3); //1d6+3
                case 13:
                    return rollRandomStat(1,3,0)  //1d3
            }
        }
    }

    function getAttacks() {

        if(weapon.attacksIsConstant) {
            numOfAttacks = (parseInt(weapon.attacks) + weapon.blast*Math.floor(parseInt(defender.models)/5))*weapon.copies
            //If rapid fire < 11 then rapid fire is constant. Values over 11 are for random rapid fire
            if (parseInt(weapon.rapidFire)< 11) {
                numOfAttacks += parseInt(weapon.rapidFire)*weapon.copies
            } else {
                for (let i=0; i < parseInt(weapon.copies); i++){
                    numOfAttacks += getRapidFire()
                }
            }
        } else {
            for (let i=0; i < parseInt(weapon.copies); i++){
                numOfAttacks += rollRandomStat(parseInt(weapon.attacksN),parseInt(weapon.attacksM),parseInt(weapon.attacksX))
                // console.log("Num of attacks" + numOfAttacks)
                numOfAttacks += getRapidFire() + weapon.blast*Math.floor(parseInt(defender.models)/5)
            }
        }
        // console.log("Num of attacks " + numOfAttacks)
    }
    
    //Rolls the sustained hits value
    //Returns the result as an integer
    function getSustainedHits(){
        const sh = parseInt(weapon.sustainedHits)
        if (sh < 11){
            return sh;
        }else {
            return rollRandomStat(1,3,0) //Sustained hits 1d3
        }
    }

    //Does numOfAttacks attacks and updates numOfHits
    //Returns void
    function hitRoll() {
        let i = 0;
        const critThreshold = 6;
        //Autohits
        //TODO: does autohit interact with other rules?
        if (parseInt(weapon.weaponSkill)===1){
            // console.log("AUTOHIT");
            numOfHits = numOfAttacks;
            return
        }
        while(i < numOfAttacks){
            let roll = rollDie();
            //console.log("Roll: " + roll)
            switch(parseInt(weapon.toHitReroll)) {
                case 1:
                    if (roll === 1) {
                        roll = rollDie();
                        //console.log("Rerolled 1s");
                    }
                    break;
                case 2:
                    if (roll !== 6 && (roll + parseInt(weapon.toHitMod))< weapon.weaponSkill) {
                        roll = rollDie();
                        //console.log("Rerolled failed");
                    }
                    break;
                case 3: 
                    if (roll < critThreshold) {
                        roll = rollDie();
                        //console.log("Rerolled non-crit");
                    }
                    break;
            }
            //TODO: program crits to also show in the graph
            if(roll >= critThreshold) {
                weapon.lethalHits ? numOfWounds++ : numOfHits++;
                numOfHits += getSustainedHits()
            }else if ((roll!==1) && (roll + parseInt(weapon.toHitMod) >= weapon.weaponSkill)){
                numOfHits++;
            }
            i++;
        }
        // console.log("NumOfHits: " + numOfHits)
    }
    
    //Recieves a strength and a toughness value
    //Returns the value required to wound
    function toWoundThreshhold(strenght,toughness) {
        const s = parseInt(strenght);
        const t = parseInt(toughness);
        if (s >= t*2) return 2
        else if (s > t) return 3
        else if (s === t) return 4
        else if (s*2 > t) return 5
        else return 6
    }

    //Does numOfHits wound rolls and updates numOfWounds
    //Returns void
    function woundRoll() {
        let i = 0;
        const threshhold = Math.min(toWoundThreshhold(weapon.strenght,defender.toughness)-parseInt(weapon.toHitMod),parseInt(weapon.anti));
        //TODO: im never using this. Check elif at the bottom 
        const normalThreshold = toWoundThreshhold(weapon.strenght,defender.toughness)-parseInt(weapon.toHitMod)
        const critThreshold = Math.min(6,parseInt(weapon.anti));
        // console.log("Wound Threshold: " + threshhold + " Normal T: " + normalThreshold + " Crit Threshold: " + critThreshold)
        while(i < numOfHits){
            let roll = rollDie();
            //console.log("Roll: " + roll)
            switch(parseInt(weapon.toWoundReroll)) {
                case 1:
                    if (roll === 1) {
                        roll = rollDie();
                        //console.log("Rerolled 1s");
                    }
                    break;
                case 2:
                    if (roll !== 6 && roll< threshhold) {
                        roll = rollDie();
                        //console.log("Rerolled failed");
                    }
                    break;
                case 3: 
                    if (roll < critThreshold) {
                        roll = rollDie();
                        //console.log("Rerolled non-crit");
                    }
                    break;
            }
            //TODO: program crits to also show in the graph
            if(roll >= critThreshold) {
                weapon.devastatingWounds ? numOfFailedSaves++ : numOfWounds++;
            }else if ((roll!==1) && (roll + parseInt(weapon.toHitMod) >= threshhold)){
                numOfWounds++;
            }
            i++;
        }
        // console.log("NumOfWounds: " + numOfWounds)
    }

    //Does numOfWounds saves and updates numOfFailedSaves
    //Returns void
    function saveRoll() {
        if (weapon.mortalWounds){
            numOfFailedSaves = numOfWounds;
            return
        }
        let i = 0;
        let threshhold
        let armorDefense = parseInt(defender.save) + parseInt(weapon.armorPen);
        if (!(weapon.ignoreCover) && defender.cover && parseInt(weapon.armorPen)!==0) {
            armorDefense--;
        }
        // console.log("ArmorDefense: " + armorDefense)
        if (defender.inv < armorDefense){
            threshhold = defender.inv;
        }else {
            threshhold = parseInt(defender.save) + parseInt(weapon.armorPen)
        }
        // console.log("Save threshhold: " + threshhold)
        while(i < numOfWounds){
            let roll = rollDie();
            //console.log("Roll: " + roll)

            if(roll<threshhold){
                numOfFailedSaves++
            }
            i++;
        }
        // console.log("NumOfFailedSaves: " + numOfFailedSaves)
    }

    //
    function rollDmg() {
        if(weapon.damageIsConstant){
            return parseInt(weapon.damage)
        } else {
            return rollRandomStat(parseInt(weapon.damageN),parseInt(weapon.damageM),parseInt(weapon.damageX))
        }
    }
    
    //Takes d amount of dmg and a fnp value and rolls fnp for each point of dmg taken
    //Returns amount of unsaved dmg
    function rollFnP(d,fnp){
        let x = 0;
        let i = 0;
        while(i<d){
            if(rollDie()<fnp) x++;
            i++;
        }
        return x
    }

    function getMelta() {
        //If melta < 11 then melta is constant. Values over 11 are for random melta
        const m = parseInt(weapon.melta);
        if(m<11) {
            return m;
        }else {
            return rollRandomStat(1,3,0)
        }
    }

    function buildDamageArray(excessDamage) {
        const a = [excessDamage]
        let d
        for (let i=0; i<numOfFailedSaves; i++){
            d = rollDmg() + getMelta()
            if(parseInt(defender.fnp) !== 0){
                d = rollFnP(d,parseInt(defender.fnp))
            }
            a.push(d)
        }
        return a;
    }

    function applyDmg(damageArray,excessDamage) {
        let modelWounds = parseInt(defender.wounds);
        damageArray.forEach(element => {
            modelWounds -= element;
            //TODO: we are adding excess damage to the totalDmg maybe also in other parts of the code too
            totalDmg += element
            if (modelWounds<=0) {
                modelWounds = parseInt(defender.wounds);
                numOfKilledModels++;
            }
        });
        excessDamage = parseInt(defender.wounds) - parseInt(modelWounds);
    }

    function killedModels(excessDamage){

        if (weapon.mortalWounds) {
            //This code here is buildDamageArray. We are adding all the dmg together
            let damageTaken = 0
            for (let i=0; i<numOfFailedSaves; i++){
                damageTaken += rollDmg() + getMelta()
            }
            totalDmg = damageTaken
            const woundsNeededToKill = parseInt(defender.wounds)
            //TODO: we are assumming fnpVsMort is always better than regular fnp (given that fnpVsMort exists)
            if (parseInt(defender.fnpVsMort)) damageTaken = parseInt(rollFnP(damageTaken,parseInt(defender.fnpVsMort)));
            else if (parseInt(defender.fnp)) damageTaken = parseInt(rollFnP(damageTaken,parseInt(defender.fnp)));
            damageTaken += excessDamage
            numOfKilledModels = Math.floor(damageTaken / woundsNeededToKill)
            excessDamage = (parseInt(damageTaken) % parseInt(woundsNeededToKill))

        }
        else {
            const damageArray = buildDamageArray(excessDamage)
            applyDmg(damageArray,excessDamage)
        }
    }

    // console.log("Is attacks fixed: " +weapon.attacksIsConstant)
    // console.log("N for attacks: " + weapon.attacksN)
    // console.log("M for attacks: " + weapon.attacksM)
    // console.log("X for attacks: " + weapon.attacksX)
    // console.log("Is damage fixed: " +weapon.damageIsConstant)
    // console.log("N for damage: " + weapon.damageN)
    // console.log("M for damage: " + weapon.damageM)
    // console.log("X for damage: " + weapon.damageX)

    let iteration = 0;
    const maxIterations = 100000; //WARNING: this value is also hardcoded in Graphs.js getAverage() and computeResults
    while(iteration<maxIterations){

        let excessDamage = excessDamageArray[iteration]
        getAttacks()
        hitRoll()
        woundRoll()
        saveRoll()
        killedModels(excessDamage)

        // console.log("Attacks: " + numOfAttacks)
        // console.log("Hits: " + numOfHits)
        // console.log("Wounds: " + numOfWounds)
        // console.log("Failed Saves: " + numOfFailedSaves)

        //TODO: moverlo a cada una de las funciones?
        newAttackResults[numOfAttacks] ? newAttackResults[numOfAttacks] = newAttackResults[numOfAttacks] + 1 : newAttackResults[numOfAttacks] = 1
        newHitResults[numOfHits] ? newHitResults[numOfHits] = newHitResults[numOfHits] + 1 : newHitResults[numOfHits] = 1
        newWoundResults[numOfWounds] ? newWoundResults[numOfWounds] = newWoundResults[numOfWounds] + 1 : newWoundResults[numOfWounds] = 1
        newSavesResults[numOfFailedSaves] ? newSavesResults[numOfFailedSaves] = newSavesResults[numOfFailedSaves] + 1 : newSavesResults[numOfFailedSaves] = 1
        newNumOfKilledModels[numOfKilledModels] ? newNumOfKilledModels[numOfKilledModels] = newNumOfKilledModels[numOfKilledModels] + 1 : newNumOfKilledModels[numOfKilledModels] = 1
        newTotalDmg[totalDmg] ? newTotalDmg[totalDmg] = newTotalDmg[totalDmg] + 1 : newTotalDmg[totalDmg] = 1

        numOfAttacks = 0;
        numOfHits = 0;
        numOfWounds = 0;
        numOfFailedSaves = 0;
        numOfKilledModels = 0;
        totalDmg = 0;
        iteration++;
    }

    

    setResults(r => {
        const newResults =  [...r]
        newResults[index] = {                
            attackResults: newAttackResults,
            hitResults: newHitResults, 
            woundResults: newWoundResults,
            savesResults: newSavesResults,
            killedModels: newNumOfKilledModels,
            totalDamage: newTotalDmg,
        }
        return newResults
    })
}

function computeResults(weapons,defender,setResults) {

    const maxIterations = 100000; //WARNING: this value is also hardcoded in Graphs.js getAverage() and computeWeapon
    const excessDamageArray = new Array(maxIterations).fill(0);
    weapons.forEach((weapon,index) => computeWeapon(weapon,index,defender,setResults,excessDamageArray))

 }

export default computeResults
