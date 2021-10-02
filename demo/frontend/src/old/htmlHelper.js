const $ = require("jQuery");
const api = require("./network.js");

// creates skeletion html for a rows of beats
function createButtonRowsHtml(drumNames, measureLength) {
    let rowListHtml = [];
    for (let i = 0; i < drumNames.length; i++) {
        rowListHtml.push(
            `
            <div class="seq-row" id="row${i}">
                <div class="row-name" id="row-name${i}">${drumNames[i][i]}</div>
                ${createInnerButtonRowsHtml(measureLength, i)}
                <div class="seq-clear fa${i}" id="seq-clear${i}"><i class="fa fa-ban fa${i}"></i></div>
            </div>
            `
        )
    }
    $('#pads').html(rowListHtml.join('\n'));
}
// helper fill functiono for the skeleton html above
function createInnerButtonRowsHtml(measureLength, currentRow) {
    let html = [];
    for (let i = 0; i < measureLength; i++) {
        html.push(
            `<div class="beat shad" id="b${currentRow}-${i}"></div>`
        )
    }
    return html.join('\n');
}
// creates html options of kits to choose from
function createKitSelectHtml() {
    api.getKitNames().then(function (data) {
        let html = [];
        data.forEach(function (e) {
            html.push(
                `
                <option value="${e.name}">${e.type} : ${e.name}</option>
                `
            )
        });
        $("#drumkit-select").html(html.join('\n'));
    })
}
// css width hack cuz i can't get it to work with css and html
function changeSequencerCSSWidth(measureLength) {
    switch (measureLength) {
        case 16:
            $("#seq").css('width', 430);
            break;
        case 32:
            $("#seq").css('width', 470);
            break;
        case 48:
            $("#seq").css('width', 646);
            break;
        case 64:
            $("#seq").css('width', 822);
            break;
        default:
            break;
    }
}
// paints the beats on or off when the kit is changs, or measure length is increase
function rePaintBeats(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let k = 0; k < matrix[i].length; k++) {
            let id = "#b" + i + "-" + k;
            if (matrix[i][k] === 1) {
                $(id).css("background-color", "rgb(74, 51, 175)");
                $(id).removeClass("shad");
            }
        }
    }
}
module.exports = {
    createButtonRowsHtml: createButtonRowsHtml,
    createKitSelectHtml: createKitSelectHtml,
    changeSequencerCSSWidth: changeSequencerCSSWidth,
    rePaintBeats: rePaintBeats
}