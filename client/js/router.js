App = {};
App.nav_select = function(path) {
  $('.menu-section ul li > a').removeClass('active');
  $('.menu-section ul li > a[href="'+path+'"]').addClass('active');
}

Router.map(function() {
  this.route('homeindex', 
    { 
      path: '/',
      onBeforeAction: function() {
        $('body').removeClass('landing_page').removeClass('mainstore').removeClass('docs_page').addClass('home');
        $('body').attr('id','home');

        this.next();

      }
    }
  );

  this.route('accountCreate',
    { 
      path: 'account/create',
      onBeforeAction: function() {
        $('body').removeClass('landing_page').removeClass('mainstore').removeClass('docs_page').removeClass('home');
        $('body').attr('id','signin');        

        this.next();

      } 
    }
  );
  this.route('accountLogin',
    { 
      path: 'account/login',
      onBeforeAction: function() {
        $('body').removeClass('landing_page').removeClass('mainstore').removeClass('docs_page').removeClass('home');
        $('body').attr('id','signin');        

        this.next();

      } 
    }
  );
  this.route('',
    { 
      path: 'account/logout',
      onBeforeAction: function() {
        $('body').removeClass('landing_page').removeClass('mainstore').removeClass('docs_page').removeClass('home');
        $('body').attr('id','signup');

        Meteor.logout();
        Router.go('/');


        this.next();

      } 
    }
  );  
  
  this.route('adminHome',
    { 
      path: '/admin',
      layoutTemplate: 'admin_home',
      onBeforeAction: function() {
        if (Meteor.userId() == null) {
          Router.go('/');
          return false;
        }
        $('body').removeClass('landing_page').removeClass('mainstore').removeClass('docs_page').removeClass('home');
        $('body').attr('id','dashboard');  

        App.nav_select(this.path);
      
        Session.set('admin_main_header',"Dashboard");
        Session.set('admin_main_header_right_yield', "admin_dashboard_main_header_right");

        Session.set('sid', null);

        this.next();

      },
      action: function() {
        this.render('admin_dashboard_panel', {to: 'admin_dashboard_panel'});
        this.render(Session.get('admin_main_header_right_yield') ? Session.get('admin_main_header_right_yield') : 'admin_dashboard_main_header_right', {to: 'admin_main_header_right'});
      }
    }
  );

  this.route('admin_home_route2',
    { 
      path: '/admin/:_admin_page',
      layoutTemplate: 'admin_home',
      waitOn: function() {
          if (Meteor.user())
          return Meteor.subscribe("emails", {cmpid: Meteor.user().profile.companyId}) &&
          Meteor.subscribe("sites", {cmpid: Meteor.user().profile.companyId}) &&
          Meteor.subscribe("pages", {cmpid: Meteor.user().profile.companyId}) &&
          Meteor.subscribe("page_updates", {cmpid: Meteor.user().profile.companyId});
      },
      onBeforeAction: function() {
        $('body').removeClass('landing_page').removeClass('mainstore').removeClass('docs_page').removeClass('home');
        $('body').attr('id','dashboard');   
        var thisPage = "admin_" + this.params._admin_page + "_index";
        Session.set('admin_page_yield', thisPage);

        App.nav_select(this.path);
        if (thisPage == "admin_manage_customers") {
          Session.set('admin_main_header',"Customers");

        } else if (thisPage == "admin_manage_products") {
          Session.set('admin_main_header',"Products");
          Session.set('admin_main_header_right_yield', "admin_products_main_header_right");          
        } else if (thisPage == "admin_sites_index") {
          Session.set('admin_main_header', "Sites");
        } else if (thisPage == "admin_pages_index") {
          Session.set('admin_main_header', "Pages");
        } else if (thisPage == "admin_pagereports_index") {
          Session.set('admin_main_header', "Page Changes Reports");
        } 

        Session.set('sid', null);

        this.next();
        
      },
      action: function() {
        this.render(Session.get('admin_page_yield') ? Session.get('admin_page_yield') : 'admin_dashboard_panel', {to: 'admin_dashboard_panel'});
        this.render(Session.get('admin_main_header_right_yield') ? Session.get('admin_main_header_right_yield') : 'admin_dashboard_main_header_right', {to: 'admin_main_header_right'});
      }
    }
  );


  this.route('admin_home_route3',
    { 
      path: '/admin/:_admin_page/:_admin_page2',
      layoutTemplate: 'admin_home',
      waitOn: function() {
          if (Meteor.user())
          return Meteor.subscribe("emails", {cmpid: Meteor.user().profile.companyId}) &&
          Meteor.subscribe("sites", {cmpid: Meteor.user().profile.companyId}) &&
          Meteor.subscribe("pages", {cmpid: Meteor.user().profile.companyId}) &&
          Meteor.subscribe("page_updates", {cmpid: Meteor.user().profile.companyId});
      },
      onBeforeAction: function() {
        $('body').removeClass('landing_page').removeClass('mainstore').removeClass('docs_page').removeClass('home');
        $('body').attr('id','dashboard');   
        var thisPage = "admin_" + this.params._admin_page + "_" + this.params._admin_page2;
        Session.set('admin_page_yield', thisPage);

        App.nav_select(this.path);
        if (thisPage == "admin_manage_customers") {
          Session.set('admin_main_header',"Customers");

        } else if (thisPage == "admin_manage_products") {
          Session.set('admin_main_header',"Products");
          Session.set('admin_main_header_right_yield', "admin_products_main_header_right");          
        } 

        Session.set('sid', null);

        this.next();

      },
      action: function() {
        this.render(Session.get('admin_page_yield') ? Session.get('admin_page_yield') : 'admin_dashboard_panel', {to: 'admin_dashboard_panel'});
        this.render(Session.get('admin_main_header_right_yield') ? Session.get('admin_main_header_right_yield') : 'admin_dashboard_main_header_right', {to: 'admin_main_header_right'});
      }
    }
  );


  this.route('admin_home_PAGES_SITES',
    { 
      path: '/admin/pages/site/:_sid',
      layoutTemplate: 'admin_home',
      waitOn: function() {
          if (Meteor.user())
          return Meteor.subscribe("emails", {cmpid: Meteor.user().profile.companyId}) &&
          Meteor.subscribe("sites", {cmpid: Meteor.user().profile.companyId}) &&
          Meteor.subscribe("pages", {cmpid: Meteor.user().profile.companyId, sid: this.params._sid}) &&
          Meteor.subscribe("page_updates", {cmpid: Meteor.user().profile.companyId});
      },
      onBeforeAction: function() {
        var thisPage = "admin_pages_index";
        Session.set('admin_page_yield', thisPage);
        Session.set('sid', this.params._sid);

        App.nav_select(this.path);
        Session.set('admin_main_header', "Pages");

        this.next();

      },
      action: function() {
        this.render(Session.get('admin_page_yield') ? Session.get('admin_page_yield') : 'admin_dashboard_panel', {to: 'admin_dashboard_panel'});
        this.render(Session.get('admin_main_header_right_yield') ? Session.get('admin_main_header_right_yield') : 'admin_dashboard_main_header_right', {to: 'admin_main_header_right'});
      }
    }
  );

  this.route('admin_home_PAGES_REPORTON',
    { 
      path: '/admin/pages/reporton/:_pid',
      layoutTemplate: 'admin_home',
      waitOn: function() {
          if (Meteor.user())
          return Meteor.subscribe("emails", {cmpid: Meteor.user().profile.companyId}) &&
          Meteor.subscribe("sites", {cmpid: Meteor.user().profile.companyId}) &&
          Meteor.subscribe("pages", {cmpid: Meteor.user().profile.companyId}) &&
          Meteor.subscribe("page_updates", {cmpid: Meteor.user().profile.companyId, pid: this.params._pid });
      },
      onBeforeAction: function() {
        var thisPage = "admin_pagereports_page_index";
        Session.set('admin_page_yield', thisPage);
        Session.set('pid', this.params._pid);

        App.nav_select(this.path);
        Session.set('admin_main_header', "Page Changes Report");

        this.next();

      },
      action: function() {
        this.render(Session.get('admin_page_yield') ? Session.get('admin_page_yield') : 'admin_dashboard_panel', {to: 'admin_dashboard_panel'});
        this.render(Session.get('admin_main_header_right_yield') ? Session.get('admin_main_header_right_yield') : 'admin_dashboard_main_header_right', {to: 'admin_main_header_right'});
      }
    }
  );

});

