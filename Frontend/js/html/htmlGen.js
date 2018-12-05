// This file contains helper functions to generate html
// maybe one day I will use a framework ¯\_(ツ)_/¯

/*  type = type of sequencer (drums or melody)
    sounds = list sounds for each row (length of this is numRows)
    length = length of grid (numColumns)
    timeSig = time signature
*/
let createGrid = (type, sounds, length, timeSig) => {
    let html = [];
    for (let i = 0; i < sounds.length; i++) {
        html.push(
                `
                <div class='sequencer-row' id='row${i}-${type}'>
                    <div class='row-name' id='row-name${i}-${type}'></div>
                    ${createRow(type, length, i)}
                    <div class='sequencer-row-clear-${type} fa${i}' id='row-clear${i}'><i class='fa fa-times fa${i}'></i></div>
                </div>
                `
        )
    }
    return html.join('\n');
}
function createRow(type, length, rowNum) {
    let html = [];
    for (let i = 0; i < length; i++) {
        html.push(`<div class='beat-${type}' id='sb${rowNum}-${i}-${type}'></div>`)
    }
    return html.join('\n');
}

export {createGrid};