var Products = new Firebase('http://featurequest.firebaseio.com/products');

function ListItem (o) {
  var iconName = 'fa-' + ' fa-building-o';
  return  '<li class="quest" id="' + o.name + '">' +
            '<div class="title-outer">' +
              '<div class="title">' +
                '<i class="fa ' + iconName + '"></i>&nbsp;&nbsp;' +
                '<a href="/' + o.name + '">' + o.name + '</a>' +
              '</div>' +
            '</div>' +
          '</li>';
}

Products.on('value', function(snap) {
  var products = snap.val();
  var keys = Object.keys(products);
  products = keys.map(function (key) {
    var product = products[key];
    product.id = key.name;
    return product;
  });
  var listItems = products.map(ListItem);
  var productsUl = document.querySelector('.products');
  productsUl.innerHTML = '';
  listItems.forEach(function(li) {
    productsUl.insertAdjacentHTML('beforeend', li);
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
