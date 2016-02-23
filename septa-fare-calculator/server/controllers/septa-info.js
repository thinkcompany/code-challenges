var SEPTAInfo = require('../models/septa-info');

module.exports.fares = function (req, res) {
   var septaInfo = new SEPTAInfo(),
	errors = [];

   // Validate query parameters here and push errors to errors array

   if (errors.length) {
   // Respond with errors
      var result = {
         "jsonapi": {"version": "1.0"},
         "meta" : {},
         "errors": []
      };
      for (var i in errors) {
         result.errors.push({
            "title": errors[i].message,
            "code": errors[i].code
         });
      }
      res.writeHead(400, {'Content-Type': 'application/vnd.api+json'});
      res.write(JSON.stringify(result));
      res.end();
   } else {
   // Get data
      septaInfo.fares("", function (err, result) {
         var status = 200;
         if (err) {
            status = 500;
            result = JSON.stringify({
               "jsonapi": {"version": "1.0"},
               "meta" : {},
               "errors": [{
                  "code": 500,
                  "title": "500 Internal Server Error"
               }]
            });
         }
         res.writeHead(status, {'Content-Type': 'application/vnd.api+json'});
         res.write(result);
         res.end();
      });
   }

}
