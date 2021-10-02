const Tone = require("Tone");
const $ = require('jQuery');
const pianoData = require("./pianoData.js");

let synthVol = -15;
let octave = 3;

var synth = new Tone.PolySynth(6, Tone.Synth, {
    "oscillator" : {
        "partials" : [0, 2, 3, 4],
    },
    "volume": synthVol
}).toMaster();

function onKeyEnter(e){
    // if enter clicked
    if (e.buttons === 1){
        if($(this).hasClass("key") || $(this).hasClass("keyDown")){
            $(this).removeClass("key");
            $(this).addClass("keyDown");
            let note = $(this)[0].className.match(/[A-Z]\d/g)[0];
            synth.triggerAttack(note);
        }
        else if($(this).hasClass("blackkey") || $(this).hasClass("blackkeyDown")){
            $(this).removeClass("blackkey");
            $(this).addClass("blackkeyDown");
            let note = $(this)[0].className.match(/[A-Z]#\d\/[A-Z]b\d/g)[0].slice(4);
            synth.triggerAttack(note);
        }
    }
}
function onKeyExit(e){
    if (e.buttons === 1){
        if($(this).hasClass("key") || $(this).hasClass("keyDown")){
            $(this).removeClass("keyDown");
            $(this).addClass("key");
            let note = $(this)[0].className.match(/[A-Z]\d/g)[0];
            synth.triggerRelease(note);
        }
        if($(this).hasClass("blackkey") || $(this).hasClass("blackkeyDown")){
            $(this).removeClass("blackkeyDown");
            $(this).addClass("blackkey");
            let note = $(this)[0].className.match(/[A-Z]#\d\/[A-Z]b\d/g)[0].slice(4);
            synth.triggerRelease(note);
        }
    }
}
function onKeyClick(e){
    // if clicked
    if (e.buttons === 1){
        if($(this).hasClass("key") || $(this).hasClass("keyDown")){
            $(this).removeClass("key");
            $(this).addClass("keyDown");
            let note = $(this)[0].className.match(/[A-Z]\d/g)[0];
            synth.triggerAttack(note);
        }
        else if($(this).hasClass("blackkey") || $(this).hasClass("blackkeyDown")){
            $(this).removeClass("blackkey");
            $(this).addClass("blackkeyDown");
            let note = $(this)[0].className.match(/[A-Z]#\d\/[A-Z]b\d/g)[0].slice(4);
            synth.triggerAttack(note);
        }
    }
    else if (e.buttons === 0){
        if($(this).hasClass("key") || $(this).hasClass("keyDown")){
            $(this).removeClass("keyDown");
            $(this).addClass("key");
            let note = $(this)[0].className.match(/[A-Z]\d/g)[0];
            synth.triggerRelease(note);
        }
        if($(this).hasClass("blackkey") || $(this).hasClass("blackkeyDown")){
            $(this).removeClass("blackkeyDown");
            $(this).addClass("blackkey");
            let note = $(this)[0].className.match(/[A-Z]#\d\/[A-Z]b\d/g)[0].slice(4);
            synth.triggerRelease(note);
        }
    }
}
function onKeyDown(e){
    if (/[A-Z]|\d/g.test(e.originalEvent.key.toUpperCase())){
        let key = e.originalEvent.key.toUpperCase();
        id = ".k" + key;
        if ($(id).hasClass("key")) {
            $(id).removeClass("key");
            $(id).addClass("keyDown");
            let note = $(id)[0].className.match(/[A-Z]\d/g)[0];
            synth.triggerAttack(note);
        }
        else if ($(id).hasClass("blackkey")) {
            $(id).removeClass("blackkey");
            $(id).addClass("blackkeyDown");
            $(this).removeClass("blackkey");
            $(this).addClass("blackkeyDown");
            let note = $(id)[0].className.match(/[A-Z]#\d\/[A-Z]b\d/g)[0].slice(4);
            synth.triggerAttack(note);
        }
    }
    
    
}
function onKeyUp(e){
    if (/[A-Z]|\d/g.test(e.originalEvent.key.toUpperCase())){
        let key = e.originalEvent.key.toUpperCase();
        id = ".k" + key;

        if ($(id).hasClass("keyDown")) {
            $(id).removeClass("keyDown");
            $(id).addClass("key");
            let note = $(id)[0].className.match(/[A-Z]\d/g)[0];
            synth.triggerRelease(note);
        }
        else if ($(id).hasClass("blackkeyDown")) {
            $(id).removeClass("blackkeyDown");
            $(id).addClass("blackkey");
            let note = $(id)[0].className.match(/[A-Z]#\d\/[qA-Z]b\d/g)[0].slice(4);
            synth.triggerRelease(note);
        }
    }
}
function synthInit(){

    // number of keys
    let id = "#synth-keys";

    // keyboard listener
    $(document).keydown(onKeyDown);
    $(document).keyup(onKeyUp);
    // map listeners and add some classes
    for (var i = 0; i < 24; i++) {
        $("#key" + i).hover(onKeyEnter,onKeyExit);
        $("#key" + i).mousedown(onKeyClick);
        $("#key" + i).mouseup(onKeyClick);
        $("#key" + i).addClass("k"+$("#key" + i)[0].children[0].innerText)
        if(i>11){
            $("#key" + i).addClass(pianoData[0][octave+1][i-12].note);
        }
        else{
            $("#key" + i).addClass(pianoData[0][octave][i].note);
        }
    }

    let synVolSlider = document.getElementById("synth-vol-slider");
    $("#synth-volume").click(function(){
        if($("#syn-vol").hasClass("fa-volume-up")){
            $("#syn-vol").removeClass("fa-volume-up");
            $("#syn-vol").addClass("fa-volume-off");
            //$("#seq-vol-slider").attr("value","0");
            synth.set({volume:-60});
            synVolSlider.value = "-60";
        }
        else{
            $("#syn-vol").removeClass("fa-volume-off");
            $("#syn-vol").addClass("fa-volume-up");
            synVolSlider.value = synthVol.toString();
            synth.set({volume:synthVol});
        }
    })

    synVolSlider.addEventListener("change",function(){
        synth.set({volume:parseInt(this.value)});
        seqVol = parseInt(this.value);
        $("#syn-vol").removeClass("fa-volume-off");
        $("#syn-vol").addClass("fa-volume-up");
    })

    synVolSlider.addEventListener("pointermove", function (e) {
        if (parseInt(this.value) != synthVol && e.buttons === 1) {
            synth.set({ volume: parseInt(this.value) });

            $("#syn-vol").removeClass("fa-volume-off");
            $("#syn-vol").addClass("fa-volume-up");
        }
        synthVol = parseInt(this.value);
    })
}

module.exports = {synth:synthInit};