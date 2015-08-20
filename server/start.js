Meteor.startup(function () {
	// code to run on server at startup
	console.log('server started');
});

Meteor.methods({
  accountCreate: function(data) {
    var userId = Accounts.createUser(
    {
      username: data.email,
      email: data.email,
      password: data.password,
      profile: {
        name: data.name,
        company: data.company,
        accountLevel: 1
      }
    });

    Meteor.call('email', { 
      type: "welcome",
      email: data.email,
      user: {
        profile: {
          name: data.name
        }
      }
    });


    return userId;
  },
  email: function (data) {
      this.unblock();
      if (data.email != undefined) {
        var emailPayload = {};
        if (data.type == "welcome") {
          emailPayload = {
              to: data.email,
              subject: 'Welcome to teamnotify.com!',
              text:   'Hi '+data.user.profile.name+",\n\n"+
                  "Welcome to your teamnotify.com account!\n\n"+
                  "Thanks,\nThe teamnotify.com Team"
              }
        } else {
          emailPayload = {
              to: data.to,
              subject: data.subject,
              text: data.text
          }
        }

        console.log(emailPayload);

        if (emailPayload.to != undefined &&
          emailPayload.subject != undefined &&
          emailPayload.text != undefined) {
          Email.send({
              to: emailPayload.to,
              from: "teamnotify.com Team <team@teamnotify.com>",
              subject: emailPayload.subject,
              html: emailPayload.text
            });
          Emails.insert({email: emailPayload});
        }
      }
  },
  saveEmailInvitation: function (email) {
  	Emails.insert({email: email});
  	console.log('email submitted by '+email);
  }
});




