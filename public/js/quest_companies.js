
var companyQuest = new Firebase('http://featurequest.firebaseio.com/');
var Companies = new Firebase('http://featurequest.firebaseio.com/companies');

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

companyQuest.child('companies').on('value', function(snap) {
  var companies = snap.val();
  var keys = Object.keys(companies);
  quests = keys.map(function (key) {
    var company = companies[key];
    quest.id = key;
    return Quest(quest);
  });
  var listItems = companies.map(ListItem);
  var questsUl = document.querySelector('.quests');
  companiesUl.innerHTML = '';
  listItems.forEach(function(li) {
    companiesUl.insertAdjacentHTML('beforeend', li);
  });
  activateBtnVote();
});

$(function () {
  activateBtnVote();
});

$('#quet-input').submit(function (e) {
  e.preventDefault();
  companyQuest.child('companies').push({
    'uid': 12345,
    'downvotes': 0,
    'upvotes': 0,
    'type': $('#type option:selected').text().toLowerCase(),
    'title': $('#comment').val()
  });
});
