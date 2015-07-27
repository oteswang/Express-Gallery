var models = require('../models');

var User = models.User;

module.exports = function() {
  return User.create(
    { username: 'bob', password: 'password'}
  );
};