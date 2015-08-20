Template.admin_sites_item.helpers({
	'pages_count': function() {
		return Pages.find({sid: this['_id']}).count();
	}
});
