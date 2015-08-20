Template.admin_dashboard_panel.helpers({
	'sites_count': function() {
		return Sites.find().count();
	},
	'site_plural': function() {
		var count = Sites.find().count();
		if (count != 1) {
			return "s";
		} else {
			return "";
		}
	},
	'pages_count': function() {
		return Pages.find().count();
	},
	'pages_plural': function() {
		var count = Pages.find().count();
		if (count != 1) {
			return "s";
		} else {
			return "";
		}
	},
	'reports_count': function() {
		return PageReports.find().count();
	},
	'reports_plural': function() {
		var count = PageReports.find().count();
		if (count != 1) {
			return "s";
		} else {
			return "";
		}
	}		
})