var models = require('../models');
var faker = require('faker');

models.sequelize
  .sync({ force: true })
  .then(function () {

    var photoData = [];
    var TOTAL_PHOTOS = faker.random.number({ min: 1, max: 100 });

    for (var i = 0; i < TOTAL_PHOTOS; i++) {
      photoData.push({
        author: faker.name.firstName(),
        link: faker.image.image(),
        description: faker.name.jobDescriptor()
      });
    }

    return models.Photo
      .bulkCreate(photoData, { returning: true });
  });