
var Companies = new Firebase('http://featurequest.firebaseio.com/companies');
var Products  = new Firebase('http://featurequest.firebaseio.com/products');

$('#new-product-form').submit(function (e) {
  e.preventDefault();

  var product_name = $('#product-name').val();
  var product_desc = $('#product-desc').val();
  var company_name = $('#company-name').val();
  var company_desc = $('#company-desc').val();

  console.log('product_name, product_desc: ', product_name, product_desc);
  console.log('company_name, company_desc: ', company_name, company_desc);

  if(! (product_name && product_desc && company_name && company_desc) ) {
    $('#notice').show();
    return false;
  }

  var res = Companies.push({
    'name': company_name,
    'desc': company_desc
  });

  console.log('res: ', res);

  var companyId = res.path.u[1];

  console.log('companyId: ', companyId);

  var productId = Products.push({
    'companyId': companyId,
    'name': product_name,
    'desc': product_desc
  });

  location.href = '/products/' + product_name;

  // var storageRef = Quests.child(newID).child("upvotes").push();  //come back another day
  // storageRef.set({'uid' : Math.random() % 500});
});
