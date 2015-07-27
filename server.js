var config = require('./config/config.json');
var path = require('path');
var express = require('express');
var app = express();

var methodOverride = require('method-override');

var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var models = require('./models');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(config.session));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// set initialize passport
require('./app/auth.js')(app);

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.get('/users',
  function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  },
  function (req, res) {
    return res.render('user', { user: req.user });
  });

app.get('/login', function (req, res) {
  return res.render('edit_photo');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/users',
  failureRedirect: '/login',
  session: true
}));

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});

app.use('/', require('./routes/gallery.js'));

models.sequelize
  .sync()
  .then(function () {
    var server = app.listen(config.port, function () {
    var host = server.address().address;
    var port = config.port.port;

    console.log('Express server listening on port http://%s:%s', host, port);
  });
});

