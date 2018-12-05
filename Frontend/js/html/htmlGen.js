// This file contains helper functions to generate html
// maybe one day I will use a framework ¯\_(ツ)_/¯

/*  type = type of sequencer (drums or melody)
    sounds = list sounds for each row (length of this is numRows)
    measureNum = number of measure
    timeSig = time signature
*/
let createGrid = (type, sounds, measureNum, timeSig) => {
    
    console.log('enter')
    let html = [];
    for (let i = 0; i < sounds.length; i++) {
        html.push(
            `
                <div class='sequencer-row' id='row${i}-${type}'>
                    <div class='row-name' id='row-name${i}-${type}'></div>
                    ${createRow(type, measureNum, i, timeSig)}
                    <div class='sequencer-row-clear-${type} fa${i}' id='row-clear${i}'><i class='fa fa-times fa${i}'></i></div>
                </div>
                `
        )
    }
    return html.join('\n');
}
let createRow = (type, measureNum, rowNum, timeSig) => {
    let gridLength = 0;
    switch (timeSig[1]) {
        case 1:
            gridLength = measureNum * (timeSig[0] * 16);
            break;
        case 2:
            gridLength = measureNum * (timeSig[0] * 8);
            break;
        case 4:
            gridLength = measureNum * (timeSig[0] * 4);
            break;
        case 8:
            gridLength = measureNum * (timeSig[0] * 2);
            break;
        case 16:
            gridLength = measureNum * timeSig[0];
            break;
        default:
            break;
    }

    let html = [];
    for (let i = 0; i < gridLength; i++) {
        html.push(`<div class='beat-${type}' id='sb${rowNum}-${i}-${type}'></div>`)
    }
    return html.join('\n');
}

export { createGrid };