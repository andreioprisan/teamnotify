Template.accountCreate.events({
  'click #account-create': function (clickEvent) {
  	var customer = {
  		'name': $('form[id="account_creation"] #name').val(),
		  'email': $('form[id="account_creation"] #email').val(),
  		'company': $('form[id="account_creation"] #company').val(),
      'cmpid': Random.id(),
  		'password': $('form[id="account_creation"] #password').val()
  	};
  	Meteor.call('accountCreate',customer, function(error, result) {
  		if (result) {
  			Meteor.loginWithPassword(customer.email, customer.password, function(errorLogin) {
  				if (!errorLogin) {
  					Router.go('/admin');
  				}
  			})
  		}
  	});

  }
});