Template.adminHome.helpers({
	admin_main_header: function() {
		var sec = Session.get('admin_main_header');
		if (sec) {
			return sec;
		} else {
			return "Dashboard";
		}
	}
})
