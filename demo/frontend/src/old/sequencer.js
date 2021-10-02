const $ = require("jQuery");
const Tone = require("Tone");
const api = require("./network.js");
const tonal = require('tonal');
const html = require('./htmlHelper.js')
const matrixHelper = require('./matrix.js')
// sequencer button on/off colors
const onColor = "rgb(74, 51, 175)";
const offColor = "rgb(116, 112, 133)";
// bg easier to type than background-color
const bg = "background-color";

// VOLUME
let seqVol = -15;

// MEASURE SIZE
// 1 = 16 beats
// 2 = 32 beats
// 3 = 48 beats
// 4 = 64 beats
let seqMeasure = 16;

// NUMBER OF DRUMS
let numDrums = 12;

// Names of sequencer notes
let drumNames = [];
// 2d array - stores if beat is on or off
let matrix = [];

// object to store drum sounds (Tone.js)
let notes = null;

// calculate measure length based off slider value
function calcMeasureLength(sliderValue) {
    switch (sliderValue) {
        case 1:
            return 16;
            break;
        case 2:
            return 32;
            break;
        case 3:
            return 48;
            break;
        case 4:
            return 64;
            break;
        default:
            break;
    }
}
// network request to get kit info by name
function getKitInfo(name) {
    if (notes != null) {
        notes.dispose();
    }
    return api.getKitByName(name);
}
// process drum info from network request
function processDrumKit(data) {
    let playersObj = {};
    drumNames = [];
    for (let i = 0; i < data[0].soundLinks.length; i++) {
        playersObj[i] = data[0].soundLinks[i].link;
        let obj = {};
        obj[i] = data[0].soundLinks[i].drumType;
        drumNames.push(obj);
    }
    numDrums = drumNames.length;
    let newNotes = new Tone.Players(playersObj).toMaster();
    newNotes.volume.value = seqVol;
    return newNotes;
}
// internal function to call when creating sequencer
// handles pusle animation and sound triggering
function sequencerInternals(time, col) {
    for (var i = 0; i < numDrums; i++) {
        let id = "#b" + i + "-" + col;
        if (matrix[i][col] === 1) {
            try { notes.get(i).start(); }
            catch (error) {};
            // pulse effect
            $(id).addClass("pulse-on");
            setTimeout(function () { $(id).removeClass("pulse-on"); }, 200);
        }
        else {
            // pulse effect
            $(id).addClass("pulse-off");
            setTimeout(function () { $(id).removeClass("pulse-off"); }, 200);
        }
    }
}
// loop is the sequencer loop
// get recreated everytime measure length changes
let loop = null;
// call to map measure increase to loop
function mapMeasureLength(length) {
    // destroy old sequencer
    if (loop != null) {
        loop.dispose();
        loop = null;
    }
    // create array of numbers the length of the measure
    let events = [];
    for (let i = 0; i < length; i++) {
        events.push(i);
    }
    // create a matrix to store the data
    if (length > seqMeasure) {
        matrix = matrixHelper.increaseMatrixLength(matrix, length);
    }
    else if (length < seqMeasure) {
        matrix = matrixHelper.decreaseMatrixLength(matrix, length);
    }
    // create the loop and start it
    loop = new Tone.Sequence(sequencerInternals, events, "16n");

    // set BPM
    Tone.Transport.bpm.value = "60";
}
// smooth mouse movement over buttons
// e.buttons == 1 means mouse held down
let mouseEnteredUnclicked = false; // tracking between 2 functions;
function onMouseEnter(e) {
    let id = e.target.id;
    let tColor = $("#" + id).css(bg);
    let row = id.match(/b\d+/)[0].slice(1);
    let col = id.match(/\d+$/)[0];
    // if mouse enters and is not held down and pad is inactive
    // TRACK
    if (e.buttons === 0 && tColor === offColor) {
        mouseEnteredUnclicked = true;
    }
    // if mouse enters and is held down and pad is inactive
    // TURN ON
    else if (e.buttons === 1 && tColor === offColor) {
        matrix[row][col] = 1;
        $("#" + id).css(bg, onColor);
        $("#" + id).removeClass("shad");
        mouseEnteredClicked = true;
        mouseEnteredUnclicked = false;
    }
    // if mouse enters and is not held down and pad is active
    // TRACK
    else if (e.buttons === 0 && tColor === onColor) {
        mouseEnteredUnclicked = true;
    }
    // if mouse enters and is held down and pad is active
    // TURN OFF
    else if (e.buttons === 1 && tColor === onColor) {
        matrix[row][col] = 0;
        $("#" + id).css(bg, offColor);
        $("#" + id).addClass("shad");
        mouseEnteredClicked = true;
        mouseEnteredUnclicked = false;
    }
}
// when mouse leaves inactive button and is clicked turn on button
function onMouseLeave(e) {
    let id = e.target.id;
    let tColor = $("#" + id).css(bg);
    let row = id.match(/b\d+/)[0].slice(1);
    let col = id.match(/\d+$/)[0];
    // if mouse leaves and is held down and pad active and mouseEnteredUnclicked is true
    if (e.buttons === 1 && tColor === onColor && mouseEnteredUnclicked) {
        matrix[row][col] = 0;
        $("#" + id).css(bg, offColor);
        $("#" + id).addClass("shad");
        mouseEnteredUnclicked = false;
    }
    // if mouse leaves and is held down and pad inactive and mouseEnteredUnclicked is true
    if (e.buttons === 1 && tColor === offColor && mouseEnteredUnclicked) {
        matrix[row][col] = 1;
        $("#" + id).css(bg, onColor);
        $("#" + id).removeClass("shad");
        mouseEnteredUnclicked = false;
    }
}
function mapSequencerClickNDragEvents() {
    // add listners for mouse enter and leave events
    $(".beat").hover(onMouseEnter, onMouseLeave);

    // do stuff when square is click, looks for class beat
    $(".beat").click(function (e) {
        let id = $(this).attr("id")
        let row = id.match(/b\d+/)[0].slice(1);
        let col = id.match(/\d+$/)[0];
        // TURN ON
        if ($("#" + id).css(bg) === offColor) {
            $("#" + id).css(bg, onColor);
            $("#" + id).removeClass("shad");
            matrix[row][col] = 1;
        }
        // TURN OFF
        else {
            $("#" + id).css(bg, offColor);
            $("#" + id).addClass("shad");
            matrix[row][col] = 0;
        }
    })
    // do stuff when ROW CLEAR button is clicked
    $(".seq-clear").click(function (e) {
        let row = e.target.className.match(/fa\d+/g)[0].slice(2);
        matrix = matrixHelper.clearMatrixRow(matrix, row, seqMeasure);
    })
}
// map all click functionality for the sequencer beats
function mapSettingsBarMouseEvents() {
    // show info
    $("#seq-info").hide();
    $("#seq-but-info").click(function () {
        if ($("#seq-info").hasClass("info-active")) {
            $("#seq-info").hide();
            $("#seq-info").removeClass("info-active");
        }
        else {
            $("#seq-info").show();
            $("#seq-info").addClass("info-active");
        }
    })
    // start/stop sequencer
    // maybe true: always start tone.transport before loop
    // or the first note of sequencer might not play
    // because the timing if off by milliseconds
    // if you start and stop the transport with the loop
    // you always hear first note, maybe
    $("#seq-start").click(function () {
        Tone.Transport.start();
        loop.start();
    })
    $("#seq-stop").click(function () {
        loop.stop();
        Tone.Transport.start();
    })
    // clear sequencer
    $("#seq-clear").click(function () {
        $(".beat").css("background-color", offColor);
        $(".beat").addClass("shad");
        matrix = matrixHelper.clearMatrix(matrix);
    })
    // upload data
    $("#seq-upload").click(function () {
        api.upload(matrix, drumKitSelector.options[drumKitSelector.selectedIndex].value);
    });
    let drumKitSelector = document.getElementById('drumkit-select');

    drumKitSelector.addEventListener('change', function () {
        let kit = drumKitSelector.options[drumKitSelector.selectedIndex].value;
        regenerateSequencer(kit);
    })
}
// map all click functionality for the 2 sliders
function mapSliderMouseEvents() {
    // VOLUME SLIDER
    // vol range is -60 to 100
    let volSlider = document.getElementById("seq-vol-slider");
    $("#seq-volume").click(function () {
        if ($("#sq-vol").hasClass("fa-volume-up")) {
            $("#sq-vol").removeClass("fa-volume-up");
            $("#sq-vol").addClass("fa-volume-off");
            //$("#seq-vol-slider").attr("value","0");
            notes.volume.value = -60;
            volSlider.value = "-60";
        }
        else {
            $("#sq-vol").removeClass("fa-volume-off");
            $("#sq-vol").addClass("fa-volume-up");
            volSlider.value = seqVol.toString();
            notes.volume.value = seqVol;
        }
    })
    volSlider.addEventListener("change", function () {
        notes.volume.value = parseInt(this.value);
        seqVol = parseInt(this.value);
        $("#sq-vol").removeClass("fa-volume-off");
        $("#sq-vol").addClass("fa-volume-up");
    })
    volSlider.addEventListener("pointermove", function (e) {
        if (parseInt(this.value) != seqVol && e.buttons === 1) {
            notes.volume.value = parseInt(this.value);
            seqVol = parseInt(this.value);
            $("#sq-vol").removeClass("fa-volume-off");
            $("#sq-vol").addClass("fa-volume-up");
        }
    })

    // MEASURE SLIDER
    let measureSlider = document.getElementById("seq-measure-slider");
    measureSlider.addEventListener("change", function () {
        measureSliderActions(calcMeasureLength(parseInt(this.value)));
    })
    measureSlider.addEventListener("pointermove", function (e) {
        if (parseInt(this.value) != seqMeasure && e.buttons === 1) {
            measureSliderActions(calcMeasureLength(parseInt(this.value)));
        }
    })
}
// called when measuer slider is moved
function measureSliderActions(newMeasureLength) {
    rowListHtml = [];
    html.createButtonRowsHtml(drumNames, newMeasureLength);
    html.changeSequencerCSSWidth(newMeasureLength);
    mapSequencerClickNDragEvents();
    mapMeasureLength(newMeasureLength);
    seqMeasure = newMeasureLength;
    html.rePaintBeats(matrix);
}
// called when new kit is loaded.
function regenerateSequencer(kitName) {
    getKitInfo(kitName).then(function (data) {
        sequencerHelper(data);
        html.rePaintBeats(matrix);
    })
}
// function to group up some common function calls
function sequencerHelper(data) {
    notes = processDrumKit(data);
    html.createButtonRowsHtml(drumNames, seqMeasure);
    mapMeasureLength(seqMeasure);
    mapSequencerClickNDragEvents();
}
// Initial sequencer load
function seqInit() {
    getKitInfo("Tight").then(function (data) {
        matrix = matrixHelper.generateMatrix(seqMeasure, numDrums);
        sequencerHelper(data);
        mapSettingsBarMouseEvents();
        mapSliderMouseEvents();
        html.createKitSelectHtml();
    })
}

module.exports = { sequencer: seqInit };