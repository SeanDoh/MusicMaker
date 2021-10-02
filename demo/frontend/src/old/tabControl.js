const $ = require('jQuery');

function tabHandle(e) {
    let id = "#" + e.target.id;
    let active = $(id).hasClass("active");
    if (id === "#seq-tab" && !active) {
        $(id).removeClass("tab");
        $(id).addClass("active");
        $("#seq").show();
        $("#synth").hide();
        $("#synth-tab").removeClass("active");
        $("#synth-tab").addClass("tab");
    }
    else if (id === "#synth-tab" && !active) {
        $(id).removeClass("tab");
        $(id).addClass("active");
        $("#synth").show();
        $("#seq").hide();
        $("#seq-tab").removeClass("active");
        $("#seq-tab").addClass("tab");
    }
}

function tabInit(){
    $("#synth").hide();
    $("#seq-tab").addClass("active");
    $("#seq-tab").click(tabHandle);
    $("#synth-tab").click(tabHandle);
}

module.exports = {tabControl:tabInit};