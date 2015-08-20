Template.accountLogin.events({
  'click #account-login': function (clickEvent) {
  	var customer = {
		  'email': $('form[id="account_login"] #email').val(),
  		'password': $('form[id="account_login"] #password').val()
  	};

    if (customer.email && customer.password) {
  		Meteor.loginWithPassword(customer.email, customer.password, function(error) {
  			if (!error) {
  				Router.go('/admin');
  			} else {
          alert('incorrect login!');
        }
    	});
    }

  }
});