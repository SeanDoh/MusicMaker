const $ = require('jquery');
// websocket
//const io = require('socket.io-client');
//let socket = '';
// twitch ext lib
//const twitch = window.Twitch.ext;
const mainUrl = 'http://music.maker/'
// tracks user auth status
let token = '';
function setToken(newToken){
    token = newToken;
}
// post loop matrix to site when upload is clicked
function upload() {
    let data = [];
    for (let i = 0; i < arguments.length;i++){
        data.push(arguments[i]);
    }
    return new Promise(function (resolve, reject) {
        let req = new XMLHttpRequest();
        req.open('POST', mainUrl + 'loops', true);        
        req.setRequestHeader('Authorization', 'Bearer ' + token);
        req.setRequestHeader('Content-type', 'application/json');
        req.onreadystatechange = function () {
            if (req.status != 200) {
                reject(req.statusText);
            }
            else if (req.readyState == 4) {
                resolve(JSON.parse(req.response));
            }
        }
        req.send(JSON.stringify(data));
    });
}

// pull kit names from server
function getKitNames() {
    return new Promise(function (resolve, reject) {
        let req = new XMLHttpRequest();
        req.open('GET', mainUrl + 'getKitNames', true);
        req.setRequestHeader('Content-type', 'application/json');
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
        req.setRequestHeader('Content-type', 'application/json');
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
// get key from server
function getKey(){
    return new Promise(function (resolve, reject) {
        let req = new XMLHttpRequest();
        req.open('GET', mainUrl + 'getKey', true);
        req.setRequestHeader('Content-type', 'application/json');
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
// get key from server
function getBpm(){
    return new Promise(function (resolve, reject) {
        let req = new XMLHttpRequest();
        req.open('GET', mainUrl + 'getBpm', true);
        req.setRequestHeader('Content-type', 'application/json');
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
    getKitByName: getKitByName,
    getKey: getKey,
    getBpm:getBpm,
    setToken:setToken
};