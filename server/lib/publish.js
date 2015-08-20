Emails = new Meteor.Collection("emails");
Sites = new Meteor.Collection("sites");
Pages = new Meteor.Collection("pages");
PageUpdates = new Meteor.Collection("page_updates");
PageReports = new Meteor.Collection("page_reports");

Meteor.publish("emails", function () {
	if (!this.userId) {
		return;
	}

	return Emails.find({});
});

Meteor.publish("sites", function () {
	if (!this.userId) {
		return;
	}

	return Sites.find({});
});

Meteor.publish("pages", function () {
	if (!this.userId) {
		return;
	}

	return Pages.find({});
});

Meteor.publish("page_updates", function () {
	if (!this.userId) {
		return;
	}

	return PageUpdates.find({});
});


Meteor.publish("page_reports", function () {
	if (!this.userId) {
		return;
	}

	return PageReports.find({});
});
