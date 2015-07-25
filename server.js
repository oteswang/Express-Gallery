var config = require('./config.json');
var express = require('express');
var app = express();

var methodOverride = require('method-override');

var bodyParser = require('body-parser');
var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride(function (req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use('/', require('./routes/gallery.js'));

var server = app.listen(config.port, function () {
  var host = server.address().address;
  var port = config.port;

  console.log('Express server listening on port http://%s:%s', host, port);
});
