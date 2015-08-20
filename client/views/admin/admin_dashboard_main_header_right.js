Template.admin_dashboard_main_header_right.helpers({
	'fullName': function() {
		if (Meteor.user()) {
			return Meteor.user()['username'];
		} else {
			return "";
		}
	},
	admin_main_header: function() {
		var sec = Session.get('admin_main_header');
		if (sec) {
			return sec;
		} else {
			return "Dashboard";
		}
	}	
})


