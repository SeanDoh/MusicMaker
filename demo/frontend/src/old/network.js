const $ = require("jQuery");
// websocket
const io = require('socket.io-client');
let socket = '';
// twitch ext lib
const twitch = window.Twitch.ext;
const mainUrl = 'https://drumloops.live/'
// tracks user auth status
let token = "";

// actions in here are taken when some logged into twitch account opens extension
twitch.onAuthorized(function (auth) {
    token = auth.token;
    let opts = {
        reconnect: true,
        secure: true,
        query: { token: token }
    };
    socket = io.connect(mainUrl, opts);
    $('#seq-upload').removeAttr('disabled');
})

// emit drumloop matrix on socket when upload is clicked
function upload() {
    //let data = {'kit': kitName, 'matrix': matrix}
    //socket.emit('drumloop', data);
}

// pull kit names from server
function getKitNames() {
    return new Promise(function (resolve, reject) {
        let req = new XMLHttpRequest();
        req.open('GET', mainUrl + 'getKitNames', true);
        req.setRequestHeader("Content-type", "application/json");
        req.onreadystatechange = function () {
            if (req.status != 200) {
                reject(req.statusText);
            }
            else if (req.readyState == 4) {
                resolve(JSON.parse(req.response));
            }
        }
        req.send();
    });
}

// pull kit info (links,etc) by name from server
function getKitByName(name) {
    return new Promise(function (resolve, reject) {
        let req = new XMLHttpRequest();
        req.open('GET', mainUrl + 'getKit?name=' + name, true);
        req.setRequestHeader("Content-type", "application/json");
        req.onreadystatechange = function () {
            if (req.status != 200) {
                reject(req.statusText);
            }
            else if (req.readyState == 4) {
                resolve(JSON.parse(req.response));
            }
        }
        req.send();
    });
}

module.exports = {
    upload: upload,
    getKitNames: getKitNames,
    getKitByName: getKitByName
};