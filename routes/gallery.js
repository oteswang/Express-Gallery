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
    Photo.findAll({})
    .then(function (table) {
      return res.render('index', {
        table: table
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

// router.route('/gallery')
//   .get(function (req, res) {
//     Photo.findAll({})
//     .then(function (table) {
//       return res.render('gallery', {
//         table: table
//       });
//     });
//   })
//   .post(function (req, res) {
//     res.redirect('/');
//   });

router.route('/gallery/:id')
  .get(function (req, res) {
    Photo.findAll({
      where: {
        "id": {
          lte: 4
        }
      }
    })
    .then(function (table) {
      Photo.findById(req.params.id)
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