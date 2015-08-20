Template.admin_sites_index.helpers({
	'all_sites': function() {
		return Sites.find();
	},
	admin_sites_item: function() {
	    return "admin_sites_item";
	}	
});

Template.admin_sites_index.events({
  'click #rescan_sitemaps': function (clickEvent) {
  	HTTP.call('GET','/api/update_sitemaps', function() {
	  	$('#rescan_sitemaps').fadeOut();
  	});
  }
});
