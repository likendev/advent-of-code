import input from './input.js';

let inputArr = input.trim().split('\n\n').map(section => {
    return section.split('\n')
}).map((section, index) => {
    let sectionObject = {};
    if(index === 0) {
        let obj = section[0].split(':');
        sectionObject[obj[0].trim()] = obj[1].trim().split(' ');
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
            if(parseInt(key) >= parseInt(map[0]) && key < parseInt(map[0]) + parseInt(map[2])) {
                result = parseInt(map[1]) + (parseInt(key) - parseInt(map[0]));
            }
        })
        return result === undefined ? parseInt(key) : result;
    }

    return getVal(remainingPath.join('.'), getVal(pathArr[0], key));
}

let start = [];
let range = [];
for(let i = 0; i < inputArr['seeds'].length; i ++) {
    if(i % 2 === 0) {
        start.push(parseInt(inputArr['seeds'][i]));
    } else {
        range.push(parseInt(inputArr['seeds'][i]));
    }
}

console.log(start);

let search = true;
let count = 0;
let answer = -1;
while(search) {
    let reverseSeed = getVal('humiditylocation.temperaturehumidity.lighttemperature.waterlight.fertilizerwater.soilfertilizer.seedsoil', count);
    console.log(count)
    start.forEach((e, i) => {
        if(reverseSeed >= e && reverseSeed < e + range[i]) {
            search = false;
            answer = count
        }
    })

    count++;
}

console.log(answer); // 41222968
