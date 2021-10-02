// somewhat generic xml wrapper function
function networkRequest(type, url, data) {
  return new Promise(function (resolve, reject) {
      let req = new XMLHttpRequest();
      req.open(type, url);
      req.setRequestHeader('Content-Type', 'application/json');
      req.onreadystatechange = function () {
          if (req.status != 200) {
              reject(JSON.parse(req));
          }
          else if (req.readyState == 4) {
              resolve(JSON.parse(req.response));
          }
      }
      type == 'GET' ? req.send() : req.send(JSON.stringify(data));
  })
}

module.exports = {
  netReq: networkRequest
}