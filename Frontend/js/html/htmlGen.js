// This file contains helper functions to generate html
// maybe one day I will use a framework ¯\_(ツ)_/¯

/*  creates the grid of squares for each sequencer
    type = type of sequencer (drums or melody)
    sounds = list sounds for each row (length of this is numRows)
    measureNum = number of measure
    timeSig = time signature
*/
let createGrid = (type, sounds, measureNum, timeSig) => {
    let html = [];
    for (let i = 0; i < sounds.length; i++) {
        html.push(
            `
                <tr class='sequencer-row' id='row${i}-${type}'>
                    <td class='row-name' id='row-name${i}-${type}'></div>
                    ${createRow(type, measureNum, i, timeSig)}
                    <td class='sequencer-row-clear-${type} fa${i} button-highlight' id='row-clear${i}'><i class='fa fa-times fa${i}'></i></div>
                </tr>
                `
        )
    }
    return html.join('\n');
}
// creates the rows for each sequencer
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
        html.push(`<td class='beat-${type}' id='sb${rowNum}-${i}-${type}'></td>`)
    }
    return html.join('\n');
}
// create controls for each sequencer
let createControls = (type) => {
    return `
            <div class='sequencer-type button-highlight' id='sequencer-type-${type}'>${type.charAt(0).toUpperCase() + type.slice(1)}</div>
            <div class='controls-button-container'>
                <button class='sequencer-start' id='start-${type}'><i class='fa fa-play'></i></button>
                <button class='sequencer-stop' id='stop-${type}'><i class='fa fa-stop'></i></button>
                <button class='sequencer-clear' id='clear-${type}'><i class='fa fa-trash'></i></button>
            </div>
            <div class='controls-sliders'>
                <div class='menu-highlight'>
                    <button class='sequencer-volume' id='volume-${type}'><i class='fa fa-volume-up' id='sq-vol-${type}'></i></button>
                    <input type='range' class='sequencer-volume-slider' id='sequencer-volume-slider-${type}' min='-60' max='0' value='-15'>
                </div>
                <div class='menu-highlight'>
                    <button class='sequencer-measure' id='measure-${type}'><i class='fa fa-braille' aria-hidden='true'></i></button>
                    <input type='range' class='sequencer-measure-slider' id='sequencer-measure-slider-${type}' min='1' max='4' value='1'>
                </div>                
            </div>
            `
}
export { createGrid, createControls };