const $ = require('jquery');
const api = require('./network.js');

function generateControlsHtml(sequencerType) {
    let html =
        `
            <div class='sequencer-label' id='sequencer-label-${sequencerType}'>${sequencerType.charAt(0).toUpperCase() + sequencerType.slice(1)}</div>
            <div class='controls-buttons'>
                <button class='sequencer-start' id='start-${sequencerType}'><i class='fa fa-play'></i></button>
                <button class='sequencer-stop' id='stop-${sequencerType}'><i class='fa fa-stop'></i></button>
                <button class='sequencer-clear' id='clear-${sequencerType}'><i class='fa fa-trash'></i></button>
            </div>
            <div class='controls-sliders'>
                <div>
                    <button class='sequencer-volume' id='volume-${sequencerType}'><i class='fa fa-volume-up' id='sq-vol-${sequencerType}'></i></button>
                    <input type='range' class='sequencer-volume-slider' id='sequencer-volume-slider-${sequencerType}' min='-60' max='0' value='-15'>
                </div>
                <div>
                    <button class='sequencer-measure' id='measure-${sequencerType}'><i class='fa fa-braille' aria-hidden='true'></i></button>
                    <input type='range' class='sequencer-measure-slider' id='sequencer-measure-slider-${sequencerType}' min='1' max='4' value='1'>
                </div>
                ${sequencerType === 'melody' ? generateOctaveShifter() : ''}
                
            </div>
            ${sequencerType === 'percussion' ? generateDropdownHtml(sequencerType) : ''}
    `
    return html;
}
function generateDropdownHtml(sequencerType) {
    let html =
        `
        <div id='percussion-select-container'>
            <select name='${sequencerType}' id='${sequencerType}-select'></select>
        </div>
    `
    return html;
}
function generateOctaveShifter(){
    return `
        <div>
            <button><i class="fa fa-music"></i></button>
            <input type='range' id='sequencer-octave-slider' min='1' max='7' value='3'>
        </div>
    `
}
function generateKitSelectionsHtml(sequencerType) {
    api.getKitNames().then(function (data) {
        let html = [];
        data.forEach(function (e) {
            html.push(
                `
                <option value='${e.name}'>${e.type} : ${e.name}</option>
                `
            )
        });
        $('#' + sequencerType + '-select').html(html.join('\n'));
    })
}
function generateSequencerPadsHtml(sequencerType, soundNames, measureLength) {
    let html = [];
    if(sequencerType === 'melody'){
        html.push(
            `
            <div id='key-container'>
            </div>
            `
        )
    }
    for (let i = 0; i < soundNames.length; i++) {
        html.push(
            `
                <div class='sequencer-row' id='row${i}-${sequencerType}'>
                    <div class='row-name' id='row-name${i}-${sequencerType}'>${sequencerType === 'percussion' ? soundNames[i][i] : soundNames[i]}</div>
                    ${generateBeatPadsHtml(sequencerType, measureLength, i)}
                    <div class='sequencer-row-clear-${sequencerType} fa${i}' id='row-clear${i}'><i class='fa fa-times fa${i}'></i></div>
                </div>
                `
        )
    }
    return html.join('\n');
}
function generateBeatPadsHtml(sequencerType, measureLength, sequencerRow) {
    let html = [];
    for (let i = 0; i < measureLength; i++) {
        html.push(`<div class='beat-${sequencerType} shadow' id='sb${sequencerRow}-${i}-${sequencerType}'></div>`)
    }
    return html.join('\n');
}
function generateTabsHtml() {
    let html = []
    for (let i = 0; i < arguments.length; i++) {
        html.push(`<div class='tab' id='sequencer-tab-${arguments[i]}'>${arguments[i]}</div>`)
    }
    let tabContainerHtml = `<div class='tab-container'>${html.join('\n')}</div>`
    return tabContainerHtml;
}
function changeSequencerCSSWidth(measureLength, type) {
    switch (measureLength) {
        case 16:
            $('#sequencer-beats-' + type).css('width', 430);
            break;
        case 32:
            $('#sequencer-beats-' + type).css('width', 470);
            break;
        case 48:
            $('#sequencer-beats-' + type).css('width', 646);
            break;
        case 64:
            $('#sequencer-beats-' + type).css('width', 822);
            break;
        default:
            break;
    }
}
function rePaintBeats(matrix, type) {
    for (let i = 0; i < matrix.length; i++) {
        for (let k = 0; k < matrix[i].length; k++) {
            let id = '#sb' + i + '-' + k + '-' + type;
            if (matrix[i][k] === 1) {
                $(id).css('background-color', 'rgb(74, 51, 175)');
                $(id).removeClass('shadow');
            }
        }
    }
}
module.exports = {
    generateControlsHtml: generateControlsHtml,
    generateTabsHtml: generateTabsHtml,
    generateKitSelectionsHtml: generateKitSelectionsHtml,
    generateSequencerPadsHtml: generateSequencerPadsHtml,
    changeSequencerCSSWidth: changeSequencerCSSWidth,
    rePaintBeats: rePaintBeats
}