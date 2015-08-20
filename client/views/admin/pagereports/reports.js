Template.admin_pagereports_index.helpers({
	'all_pagereports': function() {
		return PageReports.find();
	},
	'this_page': function() {
		return Pages.findOne({_id: this['pid']});
	},
	admin_pagereports_row: function() {
	    return "admin_pagereports_row";
	}
})


Template.admin_pagereports_index.events({
  'click #rescan_changes': function (clickEvent) {
  	HTTP.call('GET','/api/update_page_reports', function() {
	  	$('#rescan_changes').fadeOut();
  	});
  }
});

Template.admin_pagereports_item.events({
  'click .email-report': function (clickEvent) {
  	Meteor.call('email', {
  		type: "emailreport",
		to: Meteor.user().username,
		email: Meteor.user().username,
		subject: "[teamnotify.com] Report on "+$('#site_url').val(),
		text: "Hi "+Meteor.user().username+",<br><br>The report on "+$('#site_url').val()+" is available below:<br><br>"+$('.page-changes-report').html()+"<br><br>Thanks,<br>The teamnotify.com Team<br>"
  	}, function() {
  		$('.email-report').fadeOut();
  	});
  }
});

