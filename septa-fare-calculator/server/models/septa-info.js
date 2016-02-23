var fs = require("fs"),
    appRoot = require('app-root-path');

var SEPTAInfo = function () {  
  this.dataPath = appRoot + "/fares.json"
}

SEPTAInfo.prototype.fares = function (query, callback) {
  var self = this;
  fs.readFile(this.dataPath, function (err, buf) {
    if (err) {
      var message = "Error on getting data from " + self.dataPath;
      console.log(message);
      callback(new Error(message), {});
    } else {
      var resultJson = JSON.parse(buf);
	// do some processing here
      callback("", JSON.stringify(resultJson));
    }
  }); 
}

module.exports = SEPTAInfo;