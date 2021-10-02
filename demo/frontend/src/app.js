const $ = require('jquery');
const sequencer = require('./sequencer.js');
const api = require('./network.js');
const htmlGenerator = require('./htmlGenerator.js');
// websocket
const io = require('socket.io-client');
let socket = '';
// twitch ext lib
const twitch = window.Twitch.ext;
const mainUrl = 'http://musicmaker.stoosh.net/'
// tracks user auth status
let token = '';

// actions in here are taken when some logged into twitch account opens extension
twitch.onAuthorized(function (auth) {
    token = auth.token;
    api.setToken(token);
    let opts = {
        reconnect: true,
        secure: true,
        query: { token: token }
    };
    socket = io.connect(mainUrl, opts);
    $('#upload-master').removeAttr('disabled');
})

$(document).ready(function () {
    let drumSequencer = new sequencer.Sequencer('percussion');
    let melodySequencer = new sequencer.Sequencer('melody');
    api.getBpm().then(function (bpm) {
        drumSequencer.bpm = bpm.bpm;
        melodySequencer.bpm = bpm.bpm;
        $('#sequencer-bpm > span').html(bpm.bpm);
        Promise.all([drumSequencer.generateSequencer('Tight'), melodySequencer.generateSequencer()])
            .then(function (results) {
                $('#sequencer-beats-melody').hide();
                melodySequencer.isHidden = true;
                sequencer.mapSoloSettingsBarClicks(drumSequencer, melodySequencer);
                sequencer.mapMasterSettingsBarClicks(drumSequencer, melodySequencer);
                sequencer.mapSequencerShowHideClicks(drumSequencer, melodySequencer);
                sequencer.mapSoloSliderEvents(drumSequencer, melodySequencer);
                sequencer.mapMasterSliderEvents(drumSequencer, melodySequencer);
                sequencer.mapSynthControls(melodySequencer);
                //sequencer.mapAdsrControls(['attack', 'decay', 'sustain', 'release'], melodySequencer);
                if (token) {
                    socket.on('bpm', function (bpm) {
                        drumSequencer.updateBPM(bpm.bpm);
                        melodySequencer.updateBPM(bpm.bpm);
                        $('#sequencer-bpm > span').html(bpm.bpm);
                    })
                    socket.on('key', function (key) {
                        melodySequencer.processNewKey(key);
                        $('#sequencer-beats-melody').html(htmlGenerator.generateSequencerPadsHtml(melodySequencer.type, melodySequencer.soundNames, melodySequencer.measureLength));
                        htmlGenerator.rePaintBeats(melodySequencer.matrix, melodySequencer.type)
                        melodySequencer.mapBeatPadClicks();
                        $('#key-container').html(`Key: ${key.key} Mode: ${key.mode}`);
                    })
                }
            }).catch(function (err) {
                $('#sequencer-beats-percussion').html(
                    `
                <div id='server-error-container'>SERVER NOT RUNNING - OOPS :O</div>
                `
                )
                throw(err);
            })
    })
    makeDragable('#drag-anchor', '#app')
})
// Drag n drop
function makeDragable(dragHandle, dragTarget) {
    let dragObj = null; //object to be moved
    let xOffset = 0; //used to prevent dragged object jumping to mouse location
    let yOffset = 0;

    document.querySelector(dragHandle).addEventListener("mousedown", startDrag, true);
    document.querySelector(dragHandle).addEventListener("touchstart", startDrag, true);

    /*sets offset parameters and starts listening for mouse-move*/
    function startDrag(e) {
        e.preventDefault();
        e.stopPropagation();
        dragObj = document.querySelector(dragTarget);
        dragObj.style.position = "absolute";
        let rect = dragObj.getBoundingClientRect();

        if (e.type == "mousedown") {
            xOffset = e.clientX - rect.left; //clientX and getBoundingClientRect() both use viewable area adjusted when scrolling aka 'viewport'
            yOffset = e.clientY - rect.top;
            window.addEventListener('mousemove', dragObject, true);
        } else if (e.type == "touchstart") {
            xOffset = e.targetTouches[0].clientX - rect.left;
            yOffset = e.targetTouches[0].clientY - rect.top;
            window.addEventListener('touchmove', dragObject, true);
        }
    }

    /*Drag object*/
    function dragObject(e) {
        e.preventDefault();
        e.stopPropagation();

        if (dragObj == null) {
            return; // if there is no object being dragged then do nothing
        } else if (e.type == "mousemove") {
            dragObj.style.left = e.clientX - xOffset + "px"; // adjust location of dragged object so doesn't jump to mouse position
            dragObj.style.top = e.clientY - yOffset + "px";
        } else if (e.type == "touchmove") {
            dragObj.style.left = e.targetTouches[0].clientX - xOffset + "px"; // adjust location of dragged object so doesn't jump to mouse position
            dragObj.style.top = e.targetTouches[0].clientY - yOffset + "px";
        }
    }

    /*End dragging*/
    document.onmouseup = function (e) {
        if (dragObj) {
            dragObj = null;
            window.removeEventListener('mousemove', dragObject, true);
            window.removeEventListener('touchmove', dragObject, true);
        }
    }
}