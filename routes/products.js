var express = require('express');
var router = express.Router();
var title = 'FeatureQuest';
var Firebase = require('firebase');
var Products = new Firebase('https://featurequest.firebaseio.com/products');

router.get('/', function(req, res, next) {
  res.render('quest_companies', { title: title, pageJs: 'quest_companies' });
});

// This line is a template
router.get('/:product', function(req, res, next) {
  var name = req.params.product;
  var title = name + " - FeatureQuest ";
  var desc, id;

  Products.orderByChild("name").equalTo(name).once('value', function(snap){
    for(wget in snap.val()){
      console.log(snap.val()[wget]);
      desc = snap.val()[wget].desc;
      id = wget;
    }

    // res.render('product', { title: title, name : name , desc : desc, id : id, pageJs: 'product' });
    console.log("ID: ", id);
    console.log("Desc: ", desc);
    console.log("Name: ", name);
    console.log("Title: ", title);
    // firebase wurrty - Jeremy
    res.render('product', { title: title, name : name , desc : desc, id : id, pageJs: 'product' });
  });
});

module.exports = router;
