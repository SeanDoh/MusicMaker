const $ = require('jquery');
const htmlGenerator = require('./htmlGenerator.js');
const api = require('./network.js');
const Tone = require('tone')
const matrixHelper = require('./matrixHelper');
const tonal = require('@tonaljs/tonal');
console.log(tonal)

// sequencer button on/off colors
const onColor = 'rgb(74, 51, 175)';
const offColor = 'rgb(116, 112, 133)';
// bg easier to type than background-color
const bg = 'background-color';
let masterVolume = -15;
Tone.Transport.bpm.value = 125;
Tone.Master.volume.value = -15;
Tone.Transport.start();
adsrDef = {
    attack: 0.001,
    decay: 0.006,
    sustain: 0.3,
    release: 1
}

// types - percussion, melody
function Sequencer(type) {
    this.type = type;           // type of sequencer, percussion or melodic
    this.bpm = 60;
    this.volume = -15;
    this.measureLength = 16;    // number of pads horizontal
    this.numSounds = 14;        // number of pads vertical
    this.soundNames = [];       // names of sounds (drum names or note names) | drums = [{'0':1st sound name}]
    this.kit = null;
    this.key = null;            // for melody sequencer
    this.mode = null;           // for melody sequencer
    this.octave = 3;            // for melody sequencer
    this.polysynth = null ;      // for melody sequencer
    this.wavetype = 'triangle' ; // for melody sequencer
    this.synthName = null;
    this.matrix = [];           // stores sequencer data for uploading
    this.notes = null;          // for storing note sounds (Tone.js - Player)
    this.loop = null;           // sequencer class for percussion (Tone.js - Sequencer)
    this.part = null;           // sequencer like class for melody (Tone.js - Part)
    this.isHidden = false;
    this.isPlaying = false;
    this.adsr = adsrDef;
}
// CORE FUNCTIONS
Sequencer.prototype.createHtml = function () {
    if (this.type === 'percussion') {
        $('#sequencer-controls-percussion').html(htmlGenerator.generateControlsHtml(this.type));
        $('#sequencer-beats-percussion').html(htmlGenerator.generateSequencerPadsHtml(this.type, this.soundNames, this.measureLength));
    }
    else {
        $('#sequencer-controls-melody').html(htmlGenerator.generateControlsHtml(this.type));
        $('#sequencer-beats-melody').html(htmlGenerator.generateSequencerPadsHtml(this.type, this.soundNames, this.measureLength));
        $('#key-container').html(`Key: ${this.key} Mode: ${this.mode}`);
    }
}
Sequencer.prototype.generateSequencer = function (sound) {
    if (this.type === 'percussion') {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.getKitInfo(sound).then(function (json) {
                self.kit = sound;
                self.processDrumKit(json);
                self.createHtml();
                self.matrix = matrixHelper.createMatrix(self.measureLength, self.numSounds);
                self.mapMeasureLengthPercussion();
                self.mapBeatPadClicks();
                htmlGenerator.generateKitSelectionsHtml(self.type);
                resolve('success')
            }).catch(function (err) {
                reject(err)
            });
        })
    }
    else if (this.type === 'melody') {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.mapMeasureLengthMelody();
            api.getKey().then(function (json) {
                self.processKey(json);
                self.createHtml();
                self.matrix = matrixHelper.createMatrix(self.measureLength, self.numSounds);
                self.mapBeatPadClicks();
                //mapAdsrToUi(['attack','decay','sustain','release'],self);
                resolve('success');
            }).catch(function (err) {
                reject(err)
            });;
        })

    }
}

// EVENT HANDLERS
// settings bar clicks percussion

// beat pad clicks
Sequencer.prototype.mapBeatPadClicks = function () {
    let self = this;
    $('.beat-' + this.type).click(function (e) {
        let id = $(this).attr('id')
        let col = id.match(/\d+-\d+/)[0].slice(2).replace(/-/, '');
        let row = id.match(/\d+/)[0];
        // TURN ON
        if ($('#' + id).css(bg) === offColor) {
            $('#' + id).css(bg, onColor);
            self.matrix[row][col] = 1;
        }
        // TURN OFF
        else {
            $('#' + id).css(bg, offColor);
            self.matrix[row][col] = 0;
        }
    })
    // tracking variable used between hover functions
    let mouseEnteredUnclicked = false;
    $('.beat-' + this.type).hover(
        function (e) {
            let id = e.target.id;
            let tColor = $('#' + id).css(bg);
            let col = id.match(/\d+-\d+/)[0].slice(2).replace(/-/, '');
            let row = id.match(/\d+/)[0];
            // if mouse enters and is not held down and pad is inactive
            // TRACK
            if (e.buttons === 0 && tColor === offColor) {
                mouseEnteredUnclicked = true;
            }
            // if mouse enters and is held down and pad is inactive
            // TURN ON
            else if (e.buttons === 1 && tColor === offColor) {
                self.matrix[row][col] = 1;
                $('#' + id).css(bg, onColor);
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
                self.matrix[row][col] = 0;
                $('#' + id).css(bg, offColor);
                mouseEnteredUnclicked = false;
            }
        }, function (e) {
            let id = e.target.id;
            let tColor = $('#' + id).css(bg);
            let col = id.match(/\d+-\d+/)[0].slice(2).replace(/-/, '');
            let row = id.match(/\d+/)[0];
            // if mouse leaves and is held down and pad active and mouseEnteredUnclicked is true
            if (e.buttons === 1 && tColor === onColor && mouseEnteredUnclicked) {
                self.matrix[row][col] = 0;
                $('#' + id).css(bg, offColor);
                mouseEnteredUnclicked = false;
            }
            // if mouse leaves and is held down and pad inactive and mouseEnteredUnclicked is true
            if (e.buttons === 1 && tColor === offColor && mouseEnteredUnclicked) {
                self.matrix[row][col] = 1;
                $('#' + id).css(bg, onColor);
                mouseEnteredUnclicked = false;
            }
        });
    $('.sequencer-row-clear-' + this.type).click(function (e) {
        let row = e.target.className.match(/fa\d+/g)[0].slice(2);
        self.matrix = matrixHelper.clearMatrixRow(self.matrix, row, self.measureLength, self.type);
    })
}
Sequencer.prototype.mapSliderEvents = function () {

}
// HELPER FUNCTIONS
// get info on specfic drum kit (links, drum names, etc)
Sequencer.prototype.getKitInfo = function (kitName) {
    // destroy old Tone.js Players Object
    if (this.notes != null) this.notes.dispose();
    return api.getKitByName(kitName); // promise
}
// pass in getKitByName response here to process
// sets soundNames and numSounds
Sequencer.prototype.processDrumKit = function (json) {
    let playerData = {};    // object for creating Tone.js sequencer
    this.soundNames = [];
    let self = this;
    for (let i = 0; i < json[0].soundLinks.length; i++) {
        playerData[i] = json[0].soundLinks[i].link;
        let obj = {};
        obj[i] = json[0].soundLinks[i].drumType;
        self.soundNames.push(obj);
    }
    this.numSounds = this.soundNames.length;
    this.notes = new Tone.Players(playerData).toMaster();
    this.notes.volume.value = this.volume;
}
// creates Tone.js sequencer based off measureLength
// also called to recreate if measureLength changes - set this.loop
Sequencer.prototype.mapMeasureLengthPercussion = function () {
    // destroy old Tone.js sequencer
    if (this.loop != null) this.loop.dispose();
    // create array of ascending numbers, matching this.soundNames
    let events = [];
    for (let i = 0; i < this.measureLength; i++) events.push(i);
    let self = this;
    // note: callback below needs to remain inside this function to allow access to self/this
    this.loop = new Tone.Sequence(function (time, col) {
        for (let i = 0; i < self.numSounds; i++) {
            // #sb1-12-percussion
            let id = '#sb' + i + '-' + col + '-' + self.type;
            if (self.matrix[i][col] === 1) {
                try { self.notes.get(i).start(); }
                catch (error) { };
                // pulse effect
                $(id).addClass('pulse-on');
                setTimeout(function () { $(id).removeClass('pulse-on'); }, 100);
            }
            else {
                // pulse effect
                $(id).addClass('pulse-off');
                setTimeout(function () { $(id).removeClass('pulse-off'); }, 100);
            }
        }
    }, events, '16n');
    if (this.isPlaying) this.loop.start('8n');
}
Sequencer.prototype.mapMeasureLengthMelody = function () {
    let self = this;
    if (this.part != null) this.part.dispose();
    this.part = new Tone.Part(function (time, value) {
        let col = value.time.match(/[0-9]{1,2}$/)[0];
        for (let i = 0; i < self.numSounds; i++) {
            let id = '#sb' + i + '-' + col + '-' + self.type;
            if (self.matrix[i][col] === 1) {
                console.log(tonal.Note.freq(self.soundNames[i]))
                //console.log(self.soundNames[i])
                //console.log(self.soundNames[i])
                if(/##/.exec(self.soundNames[i]) || /bb/.exec(self.soundNames[i])){
                    self.polysynth.triggerAttackRelease(tonal.Note.freq(self.soundNames[i]), '16n', time, 1)
                }
                else self.polysynth.triggerAttackRelease(self.soundNames[i], '16n', time, 1)
                $(id).addClass('pulse-on');
                setTimeout(function () { $(id).removeClass('pulse-on'); }, 100);
            }
            else {
                $(id).addClass('pulse-off');
                setTimeout(function () { $(id).removeClass('pulse-off'); }, 100);
            }
        }
    }, matrixHelper.createEmptyPartEvents(this.measureLength))
    this.part.loopEnd = '0:0:' + this.measureLength
    this.part.loop = true;
    if (this.isPlaying) this.part.start('8n');
}
Sequencer.prototype.processKey = function (key) {
    this.key = key.key;
    this.mode = key.mode;
    let self = this;
    let notes = tonal.Mode.notes(key.mode.split(' ')[1], key.mode.split(' ')[0])
    //this.soundNames = notes.map(tonal.transpose(self.key + self.octave)).concat(tonal.Scale.get(self.mode).map(tonal.transpose(self.key + (self.octave + 1))));
    this.soundNames = notes;
    this.numSounds = this.soundNames.length;
    this.polysynth = new Tone.PolySynth(this.numSounds, Tone.Synth).toMaster();
    this.synthName = 'Default';
    this.polysynth.volume.value = this.volume;
}
Sequencer.prototype.processNewKey = function(newKey){
    this.key = newKey.key;
    this.mode = newKey.mode;
    let self = this;
    let oldSoundNameLength = this.numSounds;
    this.soundNames = tonal.scale(self.mode).map(tonal.transpose(self.key + self.octave)).concat(tonal.scale(self.mode).map(tonal.transpose(self.key + (self.octave + 1))));
    this.numSounds = this.soundNames.length;
    if(this.numSounds > oldSoundNameLength){
        this.matrix = matrixHelper.increaseMatrixLengthVertical(this.matrix, this.numSounds, this.measureLength);
    }
    else if (this.numSounds < oldSoundNameLength){
        this.matrix = matrixHelper.decreaseMatrixLengthVertical(this.matrix,this.numSounds);
    }
}
Sequencer.prototype.produceJson = function () {
    if (this.type === 'percussion') {
        return {
            type: this.type,
            kit: this.kit,
            matrix: this.matrix
        }
    }
    else if (this.type === 'melody') {
        return {
            type: this.type,
            wave: this.wavetype,
            octave: this.octave,
            matrix: this.matrix
        }
    }
}
Sequencer.prototype.updateBPM = function(bpm){
    this.bpm = bpm;
    Tone.Transport.bpm.value = bpm;
}
// CONTROL MAPPING
// prevents long chained spam animations
let isAnimating = false;
let infoIsHidden = true;
mapMasterSettingsBarClicks = function () {
    seq1 = arguments[0];
    seq2 = arguments[1];
    let args = arguments;
    $('#start-master').click(function () {
        seq1.loop.start('8n');
        seq2.part.start('8n');
        seq1.isPlaying = true;
        seq2.isPlaying = true;
    })
    $('#stop-master').click(function () {
        seq1.loop.stop('8n');
        seq2.part.stop('8n');
        seq1.isPlaying = false;
        seq2.isPlaying = false;
    })
    $('#clear-master').click(function () {
        for (let i = 0; i < args.length; i++) {
            clearOnClick(args[i]);
        }
    })
    $('#volume-master').click(function () {
        volumeOnClickMaster()
    })
    $('#upload-master').click(function () {
        if ($('#percussion-checkbox')[0].checked && $('#melody-checkbox')[0].checked) {
            uploadSequences('both', seq1, seq2);
        }
        else if ($('#percussion-checkbox')[0].checked) {
            uploadSequences('percussion', seq1);
        }
        else if ($('#melody-checkbox')[0].checked) {
            uploadSequences('melody', seq2);
        }
        else if (!$('#percussion-checkbox')[0].checked && !$('#melody-checkbox')[0].checked) {
            if (isAnimating) { return }
            isAnimating = true;
            $('#upload-status').addClass('upload-failure');
            $('#upload-status').removeClass('upload-success');
            $('#upload-status').html('Upload Failed - No Selection');
            $('#upload-status').fadeIn(100);
            setTimeout(function () { $('#upload-status').fadeOut(1000); }, 100);
            setTimeout(function () { isAnimating = false; }, 1100);
        }
    })
    //$('#info-popup').hide();
    $('#sequencer-info').click(function() {
        if (infoIsHidden) {
            $('#info-popup').show();
            infoIsHidden = false;
        }
        else if (!infoIsHidden) {
            $('#info-popup').hide();
            infoIsHidden = true;
        }
    })
    $('#close-info').click(function(){
        $('#info-popup').hide();
        infoIsHidden = true;
    })
}
mapSoloSettingsBarClicks = function () {
    for (let i = 0; i < arguments.length; i++) {
        let seq = arguments[i];
        // CLEAR
        $('#clear-' + seq.type).click(function () {
            clearOnClick(seq);
        })
        // START AND STOP
        if (seq.type === 'percussion') {
            $('#start-' + seq.type).click(function () {
                seq.loop.start('8n');
                seq.isPlaying = true;
            })
            $('#stop-' + seq.type).click(function () {
                seq.loop.stop('8n');
                seq.isPlaying = false;
            })
        }
        else {
            $('#start-' + seq.type).click(function () {
                seq.part.start('8n');
                seq.isPlaying = true;
            })
            $('#stop-' + seq.type).click(function () {
                seq.part.stop('8n');
                seq.isPlaying = false;
            })
        }
        // VOLUME
        $('#volume-' + seq.type).click(function () {
            volumeOnClickSolo(seq);
        })
        // SOUND SELECTION
        if (seq.type === 'percussion') {
            let soundSelector = document.getElementById(seq.type + '-select');

            soundSelector.addEventListener('change', function () {
                let newSound = soundSelector.options[soundSelector.selectedIndex].value;
                if (seq.type === 'percussion') {
                    seq.getKitInfo(newSound).then(function (json) {
                        seq.processDrumKit(json);
                        seq.kit = newSound;
                        $('#sequencer-beats-' + seq.type).html(htmlGenerator.generateSequencerPadsHtml(seq.type, seq.soundNames, seq.measureLength));
                        seq.mapMeasureLengthPercussion();
                        seq.mapBeatPadClicks();
                        htmlGenerator.rePaintBeats(seq.matrix, seq.type);
                    });
                }
            })
        }

    }
}
mapMasterSliderEvents = function () {
    seq1 = arguments[0];
    seq2 = arguments[1];
    let measureSlider = document.getElementById('measure-slider-master');
    measureSlider.addEventListener('change', function () {
        measureSliderActions(calcMeasureLength(parseInt(this.value)), seq1);
        measureSliderActions(calcMeasureLength(parseInt(this.value)), seq2);
        $('#sequencer-measure-slider-' + seq1.type)[0].value = parseInt(this.value);
        $('#sequencer-measure-slider-' + seq2.type)[0].value = parseInt(this.value);
    })
    measureSlider.addEventListener('pointermove', function (e) {
        val = parseInt(this.value);
        if (val != seq1.measureLength && e.buttons === 1) {
            measureSliderActions(calcMeasureLength(val), seq1);
            $('#sequencer-measure-slider-' + seq1.type)[0].value = val;
        }
        if (val != seq2.measureLength && e.buttons === 1) {
            measureSliderActions(calcMeasureLength(val), seq2);
            $('#sequencer-measure-slider-' + seq2.type)[0].value = val;
        }
    })

    let volumeSlider = document.getElementById('volume-slider-master');
    volumeSlider.addEventListener('change', function () {
        Tone.Master.volume.value = parseInt(this.value);
        masterVolume = parseInt(this.value);
    })
    volumeSlider.addEventListener('pointermove', function (e) {
        if (parseInt(this.value) != masterVolume && e.buttons === 1) {
            Tone.Master.volume.value = parseInt(this.value);
            masterVolume = parseInt(this.value);
        }
    })
    
}
mapSoloSliderEvents = function () {
    for (let i = 0; i < arguments.length; i++) {
        let seq = arguments[i];
        // VOLUME SLIDER
        let volSlider = document.getElementById('sequencer-volume-slider-' + seq.type);

        volSlider.addEventListener('change', function () {
            $('#sq-vol-' + seq.type).removeClass('fa-volume-off');
            $('#sq-vol-' + seq.type).addClass('fa-volume-up');
            $('#sq-vol-master').removeClass('fa-volume-off');
            $('#sq-vol-master').addClass('fa-volume-up');
            seq.volume = parseInt(this.value);
            if (seq.type === 'percussion') {
                seq.notes.volume.value = seq.volume;
            }
            else {
                seq.polysynth.volume.value = seq.volume;
            }
        })
        volSlider.addEventListener('pointermove', function (e) {
            if (parseInt(this.value) != seq.volume && e.buttons === 1) {
                $('#sq-vol' + seq.type).removeClass('fa-volume-off');
                $('#sq-vol' + seq.type).addClass('fa-volume-up');
                $('#sq-vol-master').removeClass('fa-volume-off');
                $('#sq-vol-master').addClass('fa-volume-up');
                seq.volume = parseInt(this.value);
                if (seq.type === 'percussion') {
                    seq.notes.volume.value = seq.volume;
                }
                else {
                    seq.polysynth.volume.value = seq.volume;
                }
            }
        })
        // MEASURE SLIDER
        let measureSlider = document.getElementById('sequencer-measure-slider-' + seq.type);
        measureSlider.addEventListener('change', function () {
            measureSliderActions(calcMeasureLength(parseInt(this.value)), seq);
        })
        measureSlider.addEventListener('pointermove', function (e) {
            if (parseInt(this.value) != seq.measureLength && e.buttons === 1) {
                measureSliderActions(calcMeasureLength(parseInt(this.value)), seq);
            }
        })
        if (seq.type === 'melody') {
            let octaveSlider = document.getElementById('sequencer-octave-slider');
            octaveSlider.addEventListener('change', function () {
                octaveSliderActions(parseInt(this.value), seq);
            })
            octaveSlider.addEventListener('pointermove', function (e) {
                if (parseInt(this.value) != seq.octave && e.buttons === 1) {
                    octaveSliderActions(parseInt(this.value), seq);
                }
            })
        }
    }
}
mapSequencerShowHideClicks = function (seq1, seq2) {
    $('#sequencer-label-' + seq1.type).click(function () {
        if (seq1.isHidden) {
            $('#sequencer-beats-' + seq1.type).show();
            $('#sequencer-beats-' + seq2.type).hide();
            $('#sequencer-label-' + seq1.type).css(bg, '#211e2e');
            $('#sequencer-label-' + seq2.type).css(bg, 'rgb(75, 68, 104,0)');
            seq1.isHidden = false;
            seq2.isHidden = true;
        }
    })
    $('#sequencer-label-' + seq2.type).click(function () {
        if (seq2.isHidden) {
            $('#sequencer-beats-' + seq2.type).show();
            $('#sequencer-beats-' + seq1.type).hide();
            $('#sequencer-label-' + seq2.type).css(bg, '#211e2e');
            $('#sequencer-label-' + seq1.type).css(bg, 'rgb(75, 68, 104,0)');
            seq2.isHidden = false;
            seq1.isHidden = true;
        }
    })
}
mapSynthControls = function (seq) {
    let waveTypeForm = document.getElementById('synth-wave-types');
    waveTypeForm.addEventListener('change', function (e) {
        seq.wavetype = e.target.value;
        createPolySynth(seq);
    })
}
mapAdsrControls = function(adsr,seq){
    for (let i = 0; i < adsr.length;i++){
        // sliders
        let slider = document.getElementById(adsr[i]+'-slider');
        slider.addEventListener('change', function () {
            adsrSliderActions(minAdsrNum(parseFloat(this.value),adsr[i]), adsr[i], seq);
        })
        slider.addEventListener('pointermove', function (e) {
            if (parseFloat(this.value) != seq.adsr.attack && e.buttons === 1) {
                adsrSliderActions(minAdsrNum(parseFloat(this.value),adsr[i]), adsr[i], seq);
            }
        })
        
        // number inputs
        let numInput = document.getElementById(adsr[i]+'-input');
        numInput.addEventListener('focusout',function(e){
            if(seq.adsr[adsr[i]] != parseFloat(this.value)){
                seq.adsr[adsr[i]] = parseFloat(this.value);
            }
        })
    }
    let form = document.getElementById('adsr-controls');
    form.addEventListener('submit',function(e){
        e.preventDefault();
    })
}
mapAdsrToUi = function(adsr, seq){
    for (let i = 0; i < adsr.length;i++){
        // sliders
        let slider = document.getElementById(adsr[i]+'-slider');
        if(adsr[i] === 'sustain') slider.value = numRangeConvert([0.00,1.00],[-80.0,0.0],seq.adsr[adsr[i]])
        else slider.value = seq.adsr[adsr[i]];
        // number inputs
        let numInput = document.getElementById(adsr[i]+'-input');
        if(adsr[i] === 'sustain') numInput.value = numRangeConvert([0.00,1.00],[-80.0,0.0],seq.adsr[adsr[i]])
        else numInput.value = seq.adsr[adsr[i]];
    }
}

// Listener Internals 
clearOnClick = function (seq) {
    $('.beat-' + seq.type).css('background-color', offColor);
    seq.matrix = matrixHelper.clearMatrix(seq.matrix);
}
volumeOnClickSolo = function (seq) {
    let volSlider = document.getElementById('sequencer-volume-slider-' + seq.type);
    if ($('#sq-vol-' + seq.type).hasClass('fa-volume-up')) {
        $('#sq-vol-' + seq.type).removeClass('fa-volume-up');
        $('#sq-vol-' + seq.type).addClass('fa-volume-off');
        if (seq.type === 'percussion') {
            seq.notes.volume.value = -60;
            volSlider.value = '-60';
        }
        else {
            seq.polysynth.volume.value = -60;
            volSlider.value = '-60';
        }
    }
    else {
        $('#sq-vol-' + seq.type).removeClass('fa-volume-off');
        $('#sq-vol-' + seq.type).addClass('fa-volume-up');
        $('#sq-vol-master').removeClass('fa-volume-off');
        $('#sq-vol-master').addClass('fa-volume-up');
        volSlider.value = seq.volume.toString();
        if (seq.type === 'percussion') {
            seq.notes.volume.value = seq.volume;
        }
        else {
            seq.polysynth.volume.value = seq.volume;
        }
    }
}
volumeOnClickMaster = function () {
    if ($('#sq-vol-master').hasClass('fa-volume-up')) {
        $('#sq-vol-master').removeClass('fa-volume-up');
        $('#sq-vol-master').addClass('fa-volume-off');
        Tone.Master.volume.value = -60;
        $('#volume-slider-master')[0].value = '-60';
    }
    else {
        $('#sq-vol-master').removeClass('fa-volume-off');
        $('#sq-vol-master').addClass('fa-volume-up');
        Tone.Master.volume.value = masterVolume;
        $('#volume-slider-master')[0].value = masterVolume;
    }
}
measureSliderActions = function (newMeasureLength, seq) {
    if (newMeasureLength > seq.measureLength) seq.matrix = matrixHelper.increaseMatrixLengthHorizontal(seq.matrix, newMeasureLength);
    else if (newMeasureLength < seq.measureLength) seq.matrix = matrixHelper.decreaseMatrixLengthHorizontal(seq.matrix, newMeasureLength);
    seq.measureLength = newMeasureLength;
    $('#sequencer-beats-' + seq.type).html(htmlGenerator.generateSequencerPadsHtml(seq.type, seq.soundNames, seq.measureLength));
    htmlGenerator.changeSequencerCSSWidth(seq.measureLength, seq.type);
    htmlGenerator.rePaintBeats(seq.matrix, seq.type);
    seq.mapBeatPadClicks();
    if (seq.type === 'percussion') {
        seq.mapMeasureLengthPercussion();
    }
    else {
        seq.mapMeasureLengthMelody();
        $('#key-container').html(`Key: ${seq.key} Mode: ${seq.mode}`);
    }
}
octaveSliderActions = function (newOctave, seq) {
    seq.octave = newOctave;
    seq.soundNames = tonal.scale(seq.mode).map(tonal.transpose(seq.key + seq.octave)).concat(tonal.scale(seq.mode).map(tonal.transpose(seq.key + (seq.octave + 1))));
    $('#sequencer-beats-melody').html(htmlGenerator.generateSequencerPadsHtml(seq.type, seq.soundNames, seq.measureLength));
    htmlGenerator.rePaintBeats(seq.matrix, seq.type);
    seq.mapBeatPadClicks();
    $('#key-container').html(`Key: ${seq.key} Mode: ${seq.mode}`);
}
adsrSliderActions = function (newValue, sliderType, seq) {
    switch (sliderType) {
        case 'attack':
            seq.adsr.attack = newValue;
            createPolySynth(seq);
            break;
        case 'decay':
            seq.adsr.decay = newValue;
            createPolySynth(seq);
            break;
        case 'sustain':
            seq.adsr.sustain = numRangeConvert([-80.0,0.0],[0.00,1.00],newValue);
            createPolySynth(seq);
            break;
        case 'release':
            seq.adsr.release = newValue;
            createPolySynth(seq);
            break;
        default:
            break;
    }
}
minAdsrNum = function (num, type) {
    switch (type) {
        case 'attack':
            if (num === 0) return 0.005;
            else return num;
            break;
        case 'decay':
            if (num === 0) return 0.001;
            else return num;
            break;
        case 'sustain':
            if (num === 0) return 0.001;
            else return num;
            break;
        case 'release':
            if (num === 0) return 0.001;
            else return num;
            break;
        default:
            break;
    }
}
// calculate measure length based off slider value
calcMeasureLength = function (sliderValue) {
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
uploadSequences = function () {
    switch (arguments[0]) {
        case 'both':
            api.upload(arguments[1].produceJson(), arguments[2].produceJson()).then(function (json) {
                processUploadResponse(json);
            });
            break;
        case 'percussion':
            api.upload(arguments[1].produceJson()).then(function (json) {
                processUploadResponse(json);
            });
            break;
        case 'melody':
            api.upload(arguments[1].produceJson()).then(function (json) {
                processUploadResponse(json);
            });
            break;
        default:
            break;
    }
}
processUploadResponse = function (res) {
    if (res.hasOwnProperty('error')) {
        if (isAnimating) { return }
        isAnimating = true;
        $('#upload-status').addClass('upload-failure');
        $('#upload-status').removeClass('upload-success');
        $('#upload-status').html(res.error);
        $('#upload-status').fadeIn(100);
        setTimeout(function () { $('#upload-status').fadeOut(1000); }, 100);
        setTimeout(function () { isAnimating = false; }, 1100);
    }
    else if (res.hasOwnProperty('success')) {
        if (isAnimating) { return }
        isAnimating = true;
        $('#upload-status').addClass('upload-success');
        $('#upload-status').removeClass('upload-failure');
        $('#upload-status').html(res.success);
        $('#upload-status').fadeIn(100);
        setTimeout(function () { $('#upload-status').fadeOut(1000); }, 100);
        setTimeout(function () { isAnimating = false; }, 1100);
    }
}
// recreate polysynth
createPolySynth = function (seq) {
    seq.polysynth.dispose();
    let options = {
        oscillator: {
            type: seq.wavetype
        },
        envelope: seq.adsr
    }
    seq.polysynth = new Tone.PolySynth(seq.numSounds, Tone.Synth, options).toMaster();
    seq.polysynth.volume.value = seq.volume;
}

// number range convert function
/*
range 1:	a - b	num in range to convert:	x
range 2:	c -d	convert to num in range:	y (return)
*/
numRangeConvert = function(range1,range2,x){
    let a = parseFloat(range1[0].toFixed(2));
    let b = parseFloat(range1[1].toFixed(2));
    let c = parseFloat(range2[0].toFixed(2));
    let d = parseFloat(range2[1].toFixed(2));

    return ((x - a) * ((d-c)/(b-a))) + c;
}
module.exports = {
    Sequencer: Sequencer,
    mapSoloSettingsBarClicks: mapSoloSettingsBarClicks,
    mapMasterSettingsBarClicks: mapMasterSettingsBarClicks,
    mapSoloSliderEvents: mapSoloSliderEvents,
    mapMasterSliderEvents: mapMasterSliderEvents,
    mapSequencerShowHideClicks: mapSequencerShowHideClicks,
    mapSynthControls: mapSynthControls
    //mapAdsrControls:mapAdsrControls
};