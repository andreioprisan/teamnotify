Template.admin_pages_index.helpers({
	'all_pages': function() {
		var sid = Session.get('sid');
		if (sid != null) {
			return Pages.find({sid: sid});
		} else {
			return Pages.find();
		}
	},
	admin_pages_item: function() {
	    return "admin_pages_item";
	}	
})


Template.admin_pages_index.events({
  'click #rescan_pages': function (clickEvent) {
  	HTTP.call('GET','/api/update_pages', function() {
	  	$('#rescan_pages').fadeOut();
  	});
  }
});
