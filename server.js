var express = require('express');
var app = express();

app.use(express.static('septa-fare-calculator'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/septa-fare-calculator/index.html');
});

app.listen(3000);

console.log('Listening on port 3000');