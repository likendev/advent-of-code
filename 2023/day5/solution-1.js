import input from './input.js';

let inputArr = input.trim().split('\n\n').map(section => {
    return section.split('\n')
}).map((section, index) => {
    let sectionObject = {};
    if(index === 0) {
        let obj = section[0].split(':');
        sectionObject[obj[0].trim()] = obj[1].trim().split(' ');
        // console.log(sectionObject)
    } else {
        sectionObject[section[0].split(' ')[0].trim().split('-to-').join('')] = section.slice(1);
    }

    return sectionObject;
}).reduce((a, c) => ({...a, ...c}), {});


let allMap = {};

Object.keys(inputArr).forEach((key, index) => {
    // console.log(key)
    if(index === 0) {
        allMap[key] = inputArr[key]
    } else {
        allMap[key] = inputArr[key].map(elementMap => {
            let eMap = elementMap.split(' ');
            return eMap;
        })
    }
})


const getVal = (path, key) => {
    let pathArr = path.split('.')
    let remainingPath = pathArr.splice(1);
    if (remainingPath.length === 0) {
        let result = undefined;
        allMap[pathArr[0]].forEach(map => {
            if(parseInt(key) >= parseInt(map[1]) && key < parseInt(map[1]) + parseInt(map[2])) {
                result = parseInt(map[0]) + (parseInt(key) - parseInt(map[1]));
            }
        })
        return result === undefined ? parseInt(key) : result;
    }
    
    return getVal(remainingPath.join('.'), getVal(pathArr[0], key));
}

let locations = [];

inputArr['seeds'].forEach(seed => {
    locations.push(getVal('seedsoil.soilfertilizer.fertilizerwater.waterlight.lighttemperature.temperaturehumidity.humiditylocation', seed));
})

console.log(locations)
console.log('location: ', Math.min(...locations))