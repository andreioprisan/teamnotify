Template.admin_pagereports_page_index.helpers({
	'all_pagereports': function() {
		var pid = Session.get('pid');
		if (pid != null) {
			return PageReports.find({pid: pid});
		} else {
			return PageReports.find();
		}
	},
	'this_page': function() {
		return Pages.findOne({_id: this['pid']});
	},
	admin_pagereports_item: function() {
	    return "admin_pagereports_item";
	},
	admin_pagereports_header: function() {
		return "admin_pagereports_header";
	}
})