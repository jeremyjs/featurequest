var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/featurequest', function(req, res, next) {
  res.render('quest_list');
});

router.get('/company', function(req, res, next) {
  res.render('quest_companies');
});

module.exports = router;
