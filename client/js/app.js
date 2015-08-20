Meteor.subscribe("emails");
Emails = new Mongo.Collection("emails");

Meteor.subscribe("customers");
Customers = new Mongo.Collection("customers");

Meteor.subscribe("sites");
Sites = new Mongo.Collection("sites");

Meteor.subscribe("pages");
Pages = new Mongo.Collection("pages");

Meteor.subscribe("page_updates");
PageUpdates = new Mongo.Collection("page_updates");

Meteor.subscribe("page_reports");
PageReports = new Mongo.Collection("page_reports");
