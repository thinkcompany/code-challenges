var express        = require('express'),
    app            = express(),
    septaInfo	   = require('./server/controllers/septa-info');

app.get('/', function (req, res) {
//  res.sendFile(__dirname + '/client/views/index.html');
  res.sendFile(__dirname + '/index.html');
});

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));

//JSON API
app.get('/1.0/septa-fares', septaInfo.fares);

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
	console.log('Up and running on port', app.get('port'));
})