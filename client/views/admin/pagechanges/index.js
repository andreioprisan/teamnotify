Template.admin_pagechanges_index.helpers({
	'all_pagechanges': function() {
		var sid = Session.get('sid');
		if (sid != null) {
			return PageChanges.find({pid: pid});
		} else {
			return PageChanges.find();
		}
	},
	admin_pagechanges_item: function() {
	    return "admin_pagechanges_item";
	}	
})