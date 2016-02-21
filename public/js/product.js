
// var FeatureQuest = new Firebase('http://featurequest.firebaseio.com/');
var Products = new Firebase('http://featurequest.firebaseio.com/products');
var Quests = new Firebase('http://featurequest.firebaseio.com/quests');
var productId , productObj;
console.log("ID: ", document.getElementsByClassName('quest-list')[0].getAttribute('id'));
productId = document.getElementsByClassName('quest-list')[0].getAttribute('id');
var productObj = Products.child(productId).once('value',function(snap){
  return snap.val();
});

function sortDescendingByScore (list) {
  return list.sort(function (a, b) { return b.score - a.score });
}

var sortByScore = sortDescendingByScore;

function activateBtnVote () {
  $('.btn-vote').off('click');
  $('.btn-vote').click(function (e) {
    var $target = $(e.target);
    var $btnVote = $target.parents('.btn-vote');
    var $quest = $btnVote.parents('.quest');
    var id = $quest.attr('id');
    console.log("$quest: ", $quest);
    var field = $btnVote.data('field');
    // if(field == 'downvotes'){
    //   Quests.child(id).transaction(function (quest) {
    //     console.log("quest: ", quest);
    //     quest[field] -= 1;
    //     return quest;
    //   });
    // }else{
    Quests.child(id).transaction(function (quest) {
      console.log("quest: ", quest);
      quest[field] += 1;
      return quest;
    });
    // }
  });
}

function Quest (o) {
  // var numDown = 0, numUp;
  // if(o.downvotes){
  //   numDown = Array.from(o.downvotes).length;
  // }

  // if(o.upvotes){
  //   numUp = Array.from(o.upvotes).length;
  // }else{
  //   numUp = 1;
  // }
  // o.score = numUp - numDown;
  // return o;
  o.score = o.upvotes - o.downvotes
  return o;
}

function ListItem (o) {
  console.log("o: ", o);
  var iconName = 'fa-' + (o.type === 'bug' ? 'bug' : 'magic');
  var html =  '<li class="quest" id="' + o.id + '">' +
                '<span class="leader">' +
                  '<div class="btn-vote btn-upvote" data-field="upvotes"><i class="fa fa-chevron-up"></i></div>' +
                  '<div class="quest-score"> ' + o.score + ' </div>' +
                  '<div class="btn-vote btn-downvote" data-field="downvotes"><i class="fa fa-chevron-down"></i></div>' +
                '</span>' +
                '<div class="title-outer">' +
                  '<div class="title">' +
                    '<i class="fa ' + iconName + '"></i>&nbsp;&nbsp;' +
                    o.title +
                  '</div>' +
                '</div>' +
              '</li>';
  return {
    score: o.score,
    html: html
  };
}

Quests.on('value', function(snap) {
  var quests = snap.val();
  var keys = Object.keys(quests);
  quests = keys.map(function (key) {
    var quest = quests[key];
    quest.id = key;
    return Quest(quest);
  });

  var listItems = quests.map(ListItem);
  listItems = Array.from(listItems);
  listItems = sortByScore(listItems);
  //console.log('listItems: ', listItems);

  var questsUl = document.querySelector('.quests');
  questsUl.innerHTML = '';
  listItems.forEach(function(li) {
    questsUl.insertAdjacentHTML('beforeend', li.html);
  });
  activateBtnVote();
});

$(function () {
  activateBtnVote();
});

$('#quet-input').submit(function (e) {
  e.preventDefault();
  if ($('#comment').val()==='') return;
  var newID = Quests.push({
    'upvotes': 1, //do not forget to overwrite this
    'type' : $('#type option:selected').text().toLowerCase(),
    'title': $('#comment').val(),
    'productId' : productId,
    'status' : "PENDING",
    'score' : 0,
    'downvotes': 0
  });
  $('#comment').val('');
  // var storageRef = Quests.child(newID).child("upvotes").push();  //come back another day
  // storageRef.set({'uid' : Math.random() % 500});
});

$('#comment').keyup(function(e) {

  console.log("e.which: ", e.which);
  var listItems;
  if (e.which===16) {
    // e.preventDefault();
    return;
  }

  Quests.once('value', function(snap) {
    var quests = snap.val();
    var keys = Object.keys(quests);
    quests = keys.map(function (key) {
      var quest = quests[key];
      quest.id = key;
      return Quest(quest);
    });

    var options = {
      'caseSensitive': false,
      'includeScore': false,
      'shouldSort': true,
      'threshold': 0.5,
      'location': 0,
      'distance': 100,
      'maxPatternLength': 140,
      'keys': ["title"]
    };

    var fuz = new Fuse(quests, options);
    var srchParam = $('#comment').val();
    var listItems;

    if ($('#comment').val()==='') { listItems = quests.map(ListItem); }
    else {
      var srch = fuz.search(srchParam);
      console.log('srch: ', srch);
      console.log("srchParam: ", srchParam);
      listItems = srch.map(ListItem);
    }

    listItems = Array.from(listItems);
    // listItems = sortByScore(listItems);
    //console.log('listItems: ', listItems);

    var questsUl = document.querySelector('.quests');
    questsUl.innerHTML = '';
    listItems.forEach(function(li) {
      questsUl.insertAdjacentHTML('beforeend', li.html);
    });
    activateBtnVote();
  });

});
