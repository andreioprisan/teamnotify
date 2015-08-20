Template.admin_pagereports_row.helpers({
	'this_url': function() {
		return Pages.findOne({_id: this['pid']}).url;
	}
})