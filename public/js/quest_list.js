
// var FeatureQuest = new Firebase('http://featurequest.firebaseio.com/');
var Quests = new Firebase('http://featurequest.firebaseio.com/quests');

function activateBtnVote () {
  $('.btn-vote').off('click');
  $('.btn-vote').click(function (e) {
    var $target = $(e.target);
    var $btnVote = $target.parents('.btn-vote');
    var $quest = $btnVote.parents('.quest');
    var id = $quest.attr('id');
    var field = $btnVote.data('field');
    Quests.child(id).transaction(function (quest) {
      quest[field] += 1;
      return quest;
    });
  });
}

function Quest (o) {
  o.score = o.upvotes - o.downvotes;
  return o;
}

function ListItem (o) {
  var iconName = 'fa-' + (o.type === 'bug' ? 'bug' : 'magic');
  return  '<li class="quest" id="' + o.id + '">' +
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
}

Quests.on('value', function(snap) {
  var quests = snap.val();
  var keys = Object.keys(quests);
  quests = keys.map(function (key) {
    var quest = quests[key];
    quest.id = key;
    return Quest(quest);
  });
  quests = quests.sort(function (a, b) { return a.score < b.score });
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
  if ($('#comment').val()==="") return;
  Quests.push({
    'uid': 12345,
    'downvotes': 0,
    'upvotes': 1,
    'type': $('#type option:selected').text().toLowerCase(),
    'title': $('#comment').val()
  });
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
      'threshold': 0.1,
      'location': 0,
      'distance': 100,
      'maxPatternLength': 140,
      'keys': ["title"]
    };

    var fuz = new Fuse(quests, options);
    var srchParam = $('#comment').val();
    var listItems;
    
    if (e.which===91 && $('#comment').val()==="") { listItems = quests.map(ListItem); }
    else { 
      var srch = fuz.search(srchParam);
      console.log("srchParam: ", srchParam);
      listItems = srch.map(ListItem);
    }

    var questsUl = document.querySelector('.quests');
    questsUl.innerHTML = '';
    listItems.forEach(function(li) {
      questsUl.insertAdjacentHTML('beforeend', li);
    });
    activateBtnVote();
  });

});

