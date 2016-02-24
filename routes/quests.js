var express = require('express');
var router = express.Router();
var title = 'FeatureQuest';
var Firebase = require('firebase');
var Quests = new Firebase('https://featurequest.firebaseio.com/quests');

router.get('/', function(req, res, next) {
  res.render('quest_companies', { title: title, pageJs: 'quest_companies' });
});

// This line is a template
router.get('/quests/:quest', function(req, res, next) {
  var title = req.params.quest;
  var title = title + ' - FeatureQuest ';
  var desc, id;

  Quests.orderByChild('title').equalTo(title).once('value', function(snap){
    if (!snap.exists()) { res.render('not_found'); return; }

    for(wget in snap.val()){
      console.log(snap.val()[wget]);
      status = snap.val()[wget].status;
      id = wget;
    }

    // res.render('product', { title: title, name : name , desc : desc, id : id, pageJs: 'product' });
    console.log('ID: ', id);
    console.log('Status: ', status);
    // console.log('Name: ', name);
    console.log('Title: ', title);
    // firebase wurrty - Jeremy
    res.render('product', { title: title, name : name , desc : desc, id : id, pageJs: 'product' });
  });
});

module.exports = router;
