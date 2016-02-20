
var FeatureQuest = new Firebase('http://featurequest.firebaseio.com/');

function activateBtnVote () {
  $('.btn-vote').off('click');
  $('.btn-vote').click(function (e) {
    var $quest = $(e.target).parents('.quest');
    var id = $quest.attr('id');
    var type = $quest.data('field');
    console.log('id, type: ', id, type);
    FeatureQuest.child('quests').increment();
  });
}

function Quest (o) {
  o.score = o.upvotes - o.downvotes;
  return o;
}

function ListItem (o) {
  return  '<li class="quest" id="' + o.id + '">' +
            '<span class="leader">' +
              '<div class="btn-vote btn-upvote" data-field="upvotes"><i class="fa fa-chevron-up"></i></div>' +
              '<div class="quest-score"> ' + o.score + ' </div>' +
              '<div class="btn-vote btn-downvote" data-field="downvotes"><i class="fa fa-chevron-down"></i></div>' +
            '</span>' +
            '<div class="title-outer">' +
              '<div class="title">' +
                o.title +
              '</div>' +
            '</div>' +
          '</li>';
}

FeatureQuest.child('quests').on('value', function(snap) {
  var quests = snap.val();
  console.log(quests);
  quests = quests.map(Quest);
  var listItems = quests.map(ListItem);
  var questsUl = document.querySelector('.quests');
  questsUl.innerHTML = '';
  listItems.forEach(function(li) {
    questsUl.insertAdjacentHTML('beforeend', li);
  });
  activateBtnVote();
});

$(function () {
  activateBtnVote();
});

$('#quet-input').submit(function (e) {
  e.preventDefault();
  FeatureQuest.child('quests').push({
    'uid': 12345,
    'downvotes': 0,
    'upvotes': 0,
    'type': $('#type option:selected').text().toLowerCase(),
    'title': $('#comment').val()
  });
});

