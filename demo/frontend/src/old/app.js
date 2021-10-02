const $ = require('jQuery');
const sequencer = require("./sequencer.js");
const synth = require("./synth.js");
const tabControl = require("./tabControl.js");

$(document).ready(function () {
    tabControl.tabControl();
    sequencer.sequencer();
    synth.synth();
});