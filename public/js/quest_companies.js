var Companies = new Firebase('http://featurequest.firebaseio.com/companies');

function ListItem (o) {
  var iconName = 'fa-' + ' fa-building-o';
  return  '<li class="quest" id="' + o.id + '">' +
            '<div class="title-outer">' +
              '<div class="title">' +
                '<i class="fa ' + iconName + '"></i>&nbsp;&nbsp;' +
                '<a href="/' + o.name + '">' + o.name + '</a>' +
              '</div>' +
            '</div>' +
          '</li>';
}

Companies.on('value', function(snap) {
  var companies = snap.val();
  var keys = Object.keys(companies);
  companies = keys.map(function (key) {
    var company = companies[key];
    company.id = key;
    return company;
  });
  var listItems = companies.map(ListItem);
  var companiesUl = document.querySelector('.companies');
  companiesUl.innerHTML = '';
  listItems.forEach(function(li) {
    companiesUl.insertAdjacentHTML('beforeend', li);
  });
});

// $('#company-input').submit(function (e) {
//   e.preventDefault();
//   Companies.push({
//     'name': 'company'
//   });
// });

$(document).ready(function(e) {
  $('.search-panel .dropdown-menu').find('a').click(function(e) {
    e.preventDefault();
    var param = $(this).attr("href").replace("#","");
    var concept = $(this).text();
    $('.search-panel span#search_concept').text(concept);
    $('.input-group #search_param').val(param);
  });
});
