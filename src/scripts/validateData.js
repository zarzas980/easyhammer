
//Checks is value is of the format nDm+x
function validateRandomValues(value){
    //Validates if the data is nDm+x or ndm+xm. Examples: 2D3+1
    const regex = /^(\d+|(\d*)[dD]\d+(\+\d+)?)$/
    return regex.test(value)
}

//Checks if value is a positive number
function isNaturalNumber(value) {
    const regex = /^[1-9]\d*$/;
    return regex.test(value)
}

//Checks if is a positive number o 0
function isInteger(value) {
    const regex = /^[0-9]\d*$/;
    return regex.test(value)
}

//Checks if you selected an option in a dropdown input
function isOptionSelected(value) {
    return parseInt(value) === -1 ? false: true
}

//Splits the string nDm+x into the array [n,m,x]
function getRandomStateValues(value) {
    const match = value.match(/(\d*)[dD](\d+)(?:\+(\d+))?/i)
    const n = match[1] ? parseInt(match[1]) : 1
    const m = parseInt(match[2])
    const x = match[3] ? parseInt(match[3]) : 0
    return [n,m,x]
}

//Set keyNameIsConstant to true if the stat is constant
//Otherwise keyNameIsConstant is set to false and sets the key values nDm+x in the stat.
function isStatConstant(value, keyName, setWeapons, index){
    const regex = /^[0-9]\d*$/;
    setWeapons(r => {
        const array = [...r];
        if(regex.test(value)) {
            array[index] = {...array[index], [keyName + "IsConstant"]: true}
        }else {
            const values = getRandomStateValues(value)
            array[index] = {...array[index], 
                [keyName + "IsConstant"]: false,
                [keyName + "N"]: values[0],
                [keyName + "M"]: values[1],
                [keyName + "X"]: values[2],
            }
        }
        return array;
    })
}


//Does all the data validation and updates the errors object accordingly
//Also updates each weapons object with new keys depending if attacks/damage are constant or random -> Check isStatConstant()
function validateData(weapons, defender, setWeapons, setErrors) {

    let flag = true;

    //Attacks validation
    //TODO: i can probably refactor this code to use a function instead of a big if else
    //Also, this code is shit because the if else is almost identical -> DRY
    weapons.forEach((element,index) => {

        if(!isInteger(element.copies)){
            setErrors(e => {
                const obj = {...e};
                obj.weapons[index] = {...obj.weapons[index],copies: true}
                return obj;
            })
            flag = false;
        }else {
            setErrors(e => {
                const obj = {...e};
                obj.weapons[index] = {...obj.weapons[index],copies: false}
                return obj;
            })
        }

        if(!validateRandomValues(element.attacks)){
            setErrors(e => {
                const obj = {...e};
                obj.weapons[index] = {...obj.weapons[index],attacks: true}
                return obj;
            })
            flag = false;
        }else {
            setErrors(e => {
                const obj = {...e};
                obj.weapons[index] = {...obj.weapons[index],attacks: false}
                return obj;
            })
            isStatConstant(element.attacks, "attacks", setWeapons, index)
        }

        if(!isOptionSelected(element.weaponSkill)){
            setErrors(e => {
                const obj = {...e};
                obj.weapons[index] = {...obj.weapons[index],weaponSkill: true}
                return obj;
            })
            flag = false;
        }else {
            setErrors(e => {
                const obj = {...e};
                obj.weapons[index] = {...obj.weapons[index],weaponSkill: false}
                return obj;
            })
        }

        if(!isNaturalNumber(element.strenght)){
            setErrors(e => {
                const obj = {...e};
                obj.weapons[index] = {...obj.weapons[index],strenght: true}
                return obj;
            })
            flag = false;
        }else {
            setErrors(e => {
                const obj = {...e};
                obj.weapons[index] = {...obj.weapons[index],strenght: false}
                return obj;
            })
        }

        if(!isOptionSelected(element.armorPen)){
            setErrors(e => {
                const obj = {...e};
                obj.weapons[index] = {...obj.weapons[index],armorPen: true}
                return obj;
            })
            flag = false;
        }else {
            setErrors(e => {
                const obj = {...e};
                obj.weapons[index] = {...obj.weapons[index],armorPen: false}
                return obj;
            })
        }
    
        if(!validateRandomValues(element.damage)){
            setErrors(e => {
                const obj = {...e};
                obj.weapons[index] = {...obj.weapons[index],damage: true}
                return obj;
            })
            flag = false;
        }else {
            setErrors(e => {
                const obj = {...e};
                obj.weapons[index] = {...obj.weapons[index],damage: false}
                return obj;
            })
            isStatConstant(element.damage, "damage", setWeapons, index)

        }
    });

    if(!isNaturalNumber(defender.models)){
        setErrors(e => {
            const obj = {...e};
            obj.defender = {...obj.defender,models: true}
            return obj;
        })
        flag = false;
    }else {
        setErrors(e => {
            const obj = {...e};
            obj.defender = {...obj.defender,models: false}
            return obj;
        })
    }

    if(!isNaturalNumber(defender.toughness)){
        setErrors(e => {
            const obj = {...e};
            obj.defender = {...obj.defender,toughness: true}
            return obj;
        })
        flag = false;
    }else {
        setErrors(e => {
            const obj = {...e};
            obj.defender = {...obj.defender,toughness: false}
            return obj;
        })
    }

    if(!isNaturalNumber(defender.wounds)){
        setErrors(e => {
            const obj = {...e};
            obj.defender = {...obj.defender,wounds: true}
            return obj;
        })
        flag = false;
    }else {
        setErrors(e => {
            const obj = {...e};
            obj.defender = {...obj.defender,wounds: false}
            return obj;
        })
    }

    if(!isOptionSelected(defender.save)){
        setErrors(e => {
            const obj = {...e};
            obj.defender = {...obj.defender,save: true}
            return obj;
        })
        flag = false;
    }else {
        setErrors(e => {
            const obj = {...e};
            obj.defender = {...obj.defender,save: false}
            return obj;
        })
    }
    
    return flag;
}

export default validateData