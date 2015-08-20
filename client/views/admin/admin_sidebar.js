Template.admin_sidebar.helpers({
	'fullName': function() {
		if (Meteor.user()) {
			return Meteor.user()['username'];
		} else {
			return "";
		}
	},
	'sites_count': function() {
		return Sites.find().count();
	},
	'sites_percentage': function() {
		return Sites.find().count() / 10 * 100;
	}
})