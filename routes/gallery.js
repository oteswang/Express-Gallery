var express = require('express');
var router = express.Router();
var models = require('../models');
var Photo = models.Photo;

module.exports = router;

router.use(function timelog (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.route('/')
  .get(function (req, res) {
    return Photo.findAll({
      order: [
        [models.Sequelize.fn('RANDOM')]
      ],
      limit: 6
    })
    .then(function (photos) {
      res.locals.photos = photos;
      return Photo.findOne({
        order: [
          [models.Sequelize.fn('RANDOM')]
        ]
      });
    })
    .then(function (top_image) {
      return res.render('index', {
        top_image: top_image
      });
    });
  })
  .post(function (req, res) {
    res.redirect('/');
  });

router.route('/new_photo')
  .get(function (req, res) {
    res.render('new_photo');
  })
  .post(function (req, res) {

    Photo.create({
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
    });
    res.redirect('/');
  });

router.route('/edit_photo')
  .get(function (req, res) {
    res.render('edit_photo');
  })
  .post(function (req, res) {

    Photo.create({
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
    });
    res.redirect('/');
  });

router.route('/about')
  .get(function (req, res) {
    res.render('about');
  })
  .post(function (req, res) {

    Photo.create({
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
    });
    res.redirect('/');
  });

router.route('/gallery/:id')
  .get(function (req, res) {
    return Photo.findAll({
      order: [
        [models.Sequelize.fn('RANDOM')]
      ],
      limit: 3
    })
    .then(function (table) {
      return Photo.findById(req.params.id)
      .then(function (photo) {
        if (!photo) {
          return res.redirect('/');
        }
        return res.render('gallery', {
          single_photo: photo,
          table: table
        });
      });
    });
  })
  .post(function (req, res) {
    res.redirect('/');
  });

router.route('/gallery/:id/edit')
  .get(function (req, res) {
    Photo.findOne({
      where: { "id": req.params.id }
    })
    .then(function (photo) {
      if (!photo) {
        return res.redirect('/');
      }
      return res.render('edit_photo', {
                                          id: photo.id,
                                          author: photo.author,
                                          link: photo.link,
                                          description: photo.description });
    });
  })
  .post(function (req, res) {
    res.redirect('/');
  });