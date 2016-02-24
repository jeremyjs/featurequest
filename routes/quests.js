var express = require('express');
var router = express.Router();
var title = 'FeatureQuest';
var Firebase = require('firebase');
var Quests = new Firebase('https://featurequest.firebaseio.com/quests');

// router.get('/', function(req, res, next) {
//   res.render('quest_companies', { title: title, pageJs: 'quest_companies' });
// });

// This line is a template
router.get('/:quest', function(req, res, next) {
  var id = req.params.quest;
  var title, status;//title + ' - FeatureQuest ';

  Quests.child(id).once('value', function(snap){
    if (!snap.exists()) { res.render('not_found'); return; }

    // for(wget in snap.val()){
      console.log(snap.val());
      title = snap.val().title;
      status = snap.val().status;
    // }

    // res.render('product', { title: title, name : name , desc : desc, id : id, pageJs: 'product' });
    console.log('ID: ', id);
    console.log('Status: ', status);
    // console.log('Name: ', name);
    console.log('Title: ', title);
    // firebase wurrty - Jeremy
    res.render('quest', { title: title , status : status, id : id, pageJs: 'quest' });
  });
});

module.exports = router;
