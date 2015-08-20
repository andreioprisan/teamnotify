Accounts.config({sendVerificationEmail: false, forbidClientAccountCreation: true});

Accounts.onCreateUser(function (options, user) {
	user.profile = options.profile;
	return user;
});
