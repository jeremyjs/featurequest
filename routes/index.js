var express = require('express');
var router = express.Router();
var title = 'Featurequest';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: title });
});

router.get('/FeatureQuest', function(req, res, next) {
  res.render('quest_list', { title: title, pageJs: 'quest_list' });
});

router.get('/search-products', function(req, res, next) {
  res.render('quest_companies', { title: title, pageJs: 'quest_companies' });
});

router.get('/about', function(req, res, next) {
  res.render('featureQuest_About', { title: title });
});

module.exports = router;
