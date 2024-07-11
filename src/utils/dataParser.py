import csv
import json
import re
from bs4 import BeautifulSoup

#############################################################################
#   This script uses CSVs provided by wahapedia                             #
#   https://wahapedia.ru/wh40k10ed/the-rules/data-export/                   #
#   I take those CSVs and turn them into the JSON located at ../data        #
#############################################################################

#I know this is spaghetti code.
# This is only used once for parsing the CSV so i will leave it as it is. 

factionsCSV = "./csv/Factions.csv"
datasheetsCSV = "./csv/Datasheets.csv"
datasheetsAbilitiesCSV = "./csv/Datasheets_abilities.csv"
datasheetsKeywordsCSV = "./csv/Datasheets_keywords.csv"
datasheetsModelsCSV = "./csv/Datasheets_models.csv"
datasheetsOptionsCSV = "./csv/Datasheets_options.csv"
datasheetsWargearCSV = "./csv/Datasheets_wargear.csv"
datasheetsUnitCompCSV = "./csv/Datasheets_unit_composition.csv"
datasheetsModelsCostCSV = "./csv/Datasheets_models_cost.csv"


def extractElementsAtPositions(lst, indexes):
    return [
        [sublist[i] for i in indexes] for sublist in lst 
    ]

def parseCSV(filePath,indexes):
    with open(filePath,encoding="utf8") as file:
        csvreader = csv.reader(file, delimiter="|")
        datasheets = list(csvreader)
    
    return extractElementsAtPositions(datasheets,indexes)

datasheetsParsed = parseCSV(datasheetsCSV,[0,1,2,13])
datasheetsModelsParsed = parseCSV(datasheetsModelsCSV,[0,1,2,4,5,6,8])
datasheetsWargearParsed = parseCSV(datasheetsWargearCSV,[0,1,4,5,7,8,9,10,11,12])
datasheetsUnitCompParsed = parseCSV(datasheetsUnitCompCSV,[0,1,2])
datasheetsAbilitiesParsed = parseCSV(datasheetsAbilitiesCSV,[0,2,7])

custodes = []
mechanicus = []
aeldari = []
astraMilitarum = []
agents = []
sisters = []
demons = []
csm = []
deathGuard = []
drukhari = []
cult = []
greyKnights = []
votann = []
necrons = []
orks = []
impKnights = []
chaosKnights = []
spaceMarines = []
tau = []
titans = []
thousandSons = []
tyranids = []
fortifications = []
worldEaters = []

def extractDatasheets(factionList,id):
    for datasheet in datasheetsParsed:
        if(datasheet[2]==id): factionList.append(datasheet)

extractDatasheets(custodes, "AC")
extractDatasheets(mechanicus, "AdM")
extractDatasheets(aeldari, "AE")
extractDatasheets(astraMilitarum, "AM")
extractDatasheets(agents, "AoI")
extractDatasheets(sisters, "AS")
extractDatasheets(demons, "CD")
extractDatasheets(csm, "CSM")
extractDatasheets(deathGuard, "DG")
extractDatasheets(drukhari, "DRU")
extractDatasheets(cult, "GC")
extractDatasheets(greyKnights, "GK")
extractDatasheets(votann, "LoV")
extractDatasheets(necrons, "NEC")
extractDatasheets(orks, "ORK")
extractDatasheets(impKnights, "QI")
extractDatasheets(chaosKnights, "QT")
extractDatasheets(spaceMarines, "SM")
extractDatasheets(tau, "TAU")
extractDatasheets(titans, "TL")
extractDatasheets(thousandSons, "TS")
extractDatasheets(tyranids, "TYR")
extractDatasheets(fortifications, "UN")
extractDatasheets(worldEaters, "WE")

#This is used to find all the types of the selected attribute in description part in datasheets_wargear
def findAttribute(regEx):
    myDict = {}
    for datasheet in datasheetsWargearParsed:
        a_tags = BeautifulSoup(datasheet[3], 'html.parser').get_text()
        unparsedAttributes = [x.strip() for x in a_tags.split(',')]
        for att in unparsedAttributes:
            attribute = att.lower()
            matchedAttribute = re.match(regEx, attribute)
            if matchedAttribute: myDict[matchedAttribute.group(1)] = 1
    print(myDict.keys())

# findAttribute(r'^rapid fire (\w+)$')              # -> ['1', '2', '4', '10', '6', '3', 'd6', '5', '9', 'd3']
# findAttribute(r'^sustained hits (\w+)$')          # -> ['1', '2', 'd3', '3']
# findAttribute(r'^anti(?:-[\w\s]+)? (\d+)\+?$')    # -> ['4', '2', '3', '5']
# findAttribute(r'^melta (\w+)$')                   # -> ['2', '4', '3', '6', 'd3']

def parseWeaponAttributes(attributesString):
    a_tags = BeautifulSoup(attributesString, 'html.parser').get_text()
    unparsedAttributes = [x.strip() for x in a_tags.split(',')]
    attributesDict = {
        "rapidFire": 0,
        "sustainedHits": 0,
        "ignoreCover": False,
        "anti": 99,
        "melta": 0,
        "blast": False,
        "lethalHits": False,
        "devastatingWounds": False,
        "twinLinked": False,
        "torrent": False,
        "lance": False,
        "other": [],
    }
    for att in unparsedAttributes:
        attribute = att.lower()
        matchAnti = re.match(r'^anti(?:-[\w\s]+)? (\d+)\+?$', attribute)
        matchSustainedHits = re.match(r'^sustained hits (\w+)$', attribute)
        matchRapidFire = re.match(r'^rapid fire (\w+)$', attribute)
        matchMelta = re.match(r'^melta (\w+)$', attribute)
        if matchRapidFire: attributesDict["rapidFire"] = matchRapidFire.group(1)
        elif attribute == "sustained hits d3": attributesDict["sustainedHits"] = 11
        elif matchSustainedHits: attributesDict["sustainedHits"] = matchSustainedHits.group(1)
        elif attribute == "ignores cover": attributesDict["ignoreCover"] = True
        elif matchAnti: attributesDict["anti"] = matchAnti.group(1)
        elif matchMelta: attributesDict["melta"] = matchMelta.group(1)
        elif attribute == "blast": attributesDict["blast"] = True
        elif attribute == "lethal hits": attributesDict["lethalHits"] = True
        elif attribute == "devastating wounds": attributesDict["devastatingWounds"] = True
        elif attribute == "twin-linked": attributesDict["twinLinked"] = True
        elif attribute == "torrent": attributesDict["torrent"] = True
        elif attribute == "lance": attributesDict["lance"] = True
        elif attribute == "": continue
        else : attributesDict["other"].append(attribute)
    return attributesDict

def buildWargear(id):
    weapons = []
    for datasheet in datasheetsWargearParsed:
        if datasheet[0]==id:
            weaponDict = {}
            attributesDict = parseWeaponAttributes(datasheet[3])
            weaponDict["copies"] = ""
            weaponDict["name"] = datasheet[2]
            weaponDict["line"] = datasheet[1]
            weaponDict["type"] = datasheet[4]
            weaponDict["attacks"] = datasheet[5]
            weaponDict["weaponSkill"] = 1 if attributesDict["torrent"] else datasheet[6]
            weaponDict["strenght"] = datasheet[7]
            weaponDict["armorPen"] = abs(int(datasheet[8]))
            weaponDict["damage"] = datasheet[9]
            weaponDict["rapidFire"] = attributesDict["rapidFire"]
            weaponDict["sustainedHits"] = attributesDict["sustainedHits"]
            weaponDict["toHitMod"] = 0
            weaponDict["toWoundMod"] = 0
            weaponDict["ignoreCover"] = attributesDict["ignoreCover"]
            weaponDict["anti"] = attributesDict["anti"]
            weaponDict["melta"] = attributesDict["melta"]
            weaponDict["blast"] = attributesDict["blast"]
            weaponDict["toHitReroll"] = 0
            weaponDict["toWoundReroll"] = 0
            weaponDict["mortalWounds"] = False
            weaponDict["lethalHits"] = attributesDict["lethalHits"]
            weaponDict["devastatingWounds"] = attributesDict["devastatingWounds"]
            weaponDict["twinLinked"] = attributesDict["twinLinked"]
            weaponDict["lance"] = attributesDict["lance"]
            weaponDict["other"] = attributesDict["other"]
            weapons.append(weaponDict)
    return weapons

def findFnPAndStealth(id):
    stealth = False
    fnp = 0
    for datasheet in datasheetsAbilitiesParsed:
        if datasheet[0] == id:
            if datasheet[1] == "000008337": stealth = True
            elif datasheet[1] == "000008338": fnp = datasheet[2]
    return [stealth,fnp]

def buildDefender(id):
    defenderDict = {
        "name": "weapon",
        "models": "",
        "toughness": "",
        "wounds": "",
        "save": -1,
        "inv": 99,
        "fnp": 0,
        "cover": False,
        "stealth": False,
        "fnpVsMort": 0,
        "dmgReduction": 0,
        "defenderNotes": [],
    }
    [stealth,fnp] = findFnPAndStealth(id)
    defenderDict["stealth"] = stealth
    defenderDict["fnp"] = fnp
    for datasheet in datasheetsModelsParsed:
        if datasheet[0]==id:
                defenderDict["models"] = ""
                defenderDict["toughness"] = datasheet[3]
                defenderDict["wounds"] = datasheet[6]
                defenderDict["save"] = re.sub(r'(\d)\+', r'\1', datasheet[4]) #Removes the + sign
                defenderDict["inv"] = 99 if datasheet[5] == "-" else datasheet[5]
                defenderDict["fnpVsMort"] = 0
                defenderDict["dmgReduction"] = 0
                break
    return defenderDict

custodes_dict = {}
mechanicus_dict = {}
aeldari_dict = {}
astraMilitarum_dict = {}
agents_dict = {}
sisters_dict = {}
demons_dict = {}
csm_dict = {}
deathGuard_dict = {}
drukhari_dict = {}
cult_dict = {}
greyKnights_dict = {}
votann_dict = {}
necrons_dict = {}
orks_dict = {}
impKnights_dict = {}
chaosKnights_dict = {}
spaceMarines_dict = {}
tau_dict = {}
titans_dict = {}
thousandSons_dict = {}
tyranids_dict = {}
fortifications_dict = {}
worldEaters_dict = {}

emptyWeaponsNames = {}
emptyWeaponsFaction = {}

def buildFactionDict(factionList,factionDict):
    for datasheet in factionList:
        unitId = datasheet[0]
        factionDict[unitId] = {}
        factionDict[unitId]["name"] = datasheet[1]
        factionDict[unitId]["link"] = datasheet[3]
        factionDict[unitId]["weapons"] = buildWargear(unitId)
        if len(factionDict[unitId]["weapons"])==0: 
            emptyWeaponsNames[unitId] = factionDict[unitId]["name"]
            emptyWeaponsFaction[unitId] = factionDict
        factionDict[unitId]["weaponsNotes"] = []
        factionDict[unitId]["defender"] = buildDefender(unitId)

buildFactionDict(custodes, custodes_dict)
buildFactionDict(mechanicus, mechanicus_dict)
buildFactionDict(aeldari, aeldari_dict)
buildFactionDict(astraMilitarum, astraMilitarum_dict)
buildFactionDict(agents, agents_dict)
buildFactionDict(sisters, sisters_dict)
buildFactionDict(demons, demons_dict)
buildFactionDict(csm, csm_dict)
buildFactionDict(deathGuard, deathGuard_dict)
buildFactionDict(drukhari, drukhari_dict)
buildFactionDict(cult, cult_dict)
buildFactionDict(greyKnights, greyKnights_dict)
buildFactionDict(votann, votann_dict)
buildFactionDict(necrons, necrons_dict)
buildFactionDict(orks, orks_dict)
buildFactionDict(impKnights, impKnights_dict)
buildFactionDict(chaosKnights, chaosKnights_dict)
buildFactionDict(spaceMarines, spaceMarines_dict)
buildFactionDict(tau, tau_dict)
buildFactionDict(titans, titans_dict)
buildFactionDict(thousandSons, thousandSons_dict)
buildFactionDict(tyranids, tyranids_dict)
buildFactionDict(fortifications, fortifications_dict)
buildFactionDict(worldEaters, worldEaters_dict)


#This is the worst way to do it. I dont want to deal with the csv again.
def filEmptyWeapons():
    factionDictionaries = [
        custodes_dict,
        mechanicus_dict,
        aeldari_dict,
        astraMilitarum_dict,
        agents_dict,
        sisters_dict,
        demons_dict,
        csm_dict,
        deathGuard_dict,
        drukhari_dict,
        cult_dict,
        greyKnights_dict,
        votann_dict,
        necrons_dict,
        orks_dict,
        impKnights_dict,
        chaosKnights_dict,
        spaceMarines_dict,
        tau_dict,
        titans_dict,
        thousandSons_dict,
        tyranids_dict,
        fortifications_dict,
        worldEaters_dict
    ]
    for id, name in emptyWeaponsNames.items():
        for factionDict in factionDictionaries:
            for datasheetId, datasheetObject in factionDict.items():
                if name==datasheetObject["name"] and len(datasheetObject["weapons"])!=0: 
                    emptyWeaponsFaction[id][id]["weapons"] = datasheetObject["weapons"]
                    emptyWeaponsFaction[id][id]["copied"] = f"Weapons copied from {datasheetId}"
                    break
            else:
                continue
            break
        else:
            emptyWeaponsFaction[id][id]["weaponsNotes"].append("This unit has no weapons.")

filEmptyWeapons()

def buildJSON(factionDict, fileName):
    filePath = f"../data/datasheets/{fileName}.json"
    with open(filePath,"w") as f:
        json.dump(factionDict,f,indent=4)

buildJSON(custodes_dict, "custodes")
buildJSON(mechanicus_dict, "mechanicus")
buildJSON(aeldari_dict, "aeldari")
buildJSON(astraMilitarum_dict, "astraMilitarum")
buildJSON(agents_dict, "agents")
buildJSON(sisters_dict, "sisters")
buildJSON(demons_dict, "demons")
buildJSON(csm_dict, "csm")
buildJSON(deathGuard_dict, "deathGuard")
buildJSON(drukhari_dict, "drukhari")
buildJSON(cult_dict, "cult")
buildJSON(greyKnights_dict, "greyKnights")
buildJSON(votann_dict, "votann")
buildJSON(necrons_dict, "necrons")
buildJSON(orks_dict, "orks")
buildJSON(impKnights_dict, "impKnights")
buildJSON(chaosKnights_dict, "chaosKnights")
buildJSON(spaceMarines_dict, "spaceMarines")
buildJSON(tau_dict, "tau")
buildJSON(titans_dict, "titans")
buildJSON(thousandSons_dict, "thousandSons")
buildJSON(tyranids_dict, "tyranids")
buildJSON(fortifications_dict, "fortifications")
buildJSON(worldEaters_dict, "worldEaters")

def printEmptyWeapons():
    with open(f"./emptyWeapons.json","w") as f:
        json.dump(emptyWeaponsNames,f,indent=4)

printEmptyWeapons()

