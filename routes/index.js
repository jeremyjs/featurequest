var express = require('express');
var router = express.Router();
var title = 'FeatureQuest';
var Firebase = require('firebase');
var Products = new Firebase('https://featurequest.firebaseio.com/products');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: title });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: title });
});

router.get('/new-product', function(req, res, next) {
  res.render('new_product', { title: title, pageJs: 'new_product' });
});

module.exports = router;
