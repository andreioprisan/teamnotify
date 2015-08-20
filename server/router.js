Router.map(function() {
    this.route('update_sitemaps', {
        path: '/api/update_sitemaps',
        where: 'server',
        action: function() {
            // GET, POST, PUT, DELETE
            var requestMethod = this.request.method;
            // Data from a POST request
            var requestData = this.request.body;
            
            var sites = Sites.find().fetch();
            var xmlParser = xml2js.Parser();

            var Fiber = Npm.require('fibers');
            var Future = Npm.require('fibers/future');
            var fut = new Future();

            var sitemap_pages = 0;
            var sites_results = [];

            Fiber(function() {

            _.each(sites, function(content, index) {
                if (content.hasOwnProperty('sitemap')) {
                    var sitemap = content.sitemap;

                    HTTP.call('GET', content.sitemap, function(error, requestBody) {
                        xmlParser.parseString(requestBody.content, function(err, parsedXML){
                            var urls = parsedXML.urlset['url'];
                            _.each(urls, function(urlData) {
                                var firstUrl = urlData.loc[0];
                                if (firstUrl.indexOf(content.url) !== -1) {
                                    var insertPage = {
                                        cmpid: content.cmpid,
                                        sid: content['_id'],
                                        url: urlData.loc[0],
                                        lastmod: urlData.lastmod[0],
                                        from_sitemap: 1
                                    }

                                    Pages.upsert(
                                        { 
                                            url: insertPage.url, 
                                            sid: insertPage.sid,
                                            cmpid: insertPage.cmpid
                                        }, {
                                            $set: insertPage
                                        }
                                    );

                                    sitemap_pages++;
                                }
                            });

                            sites_results.push({count: sitemap_pages, domain: content.url});
                        });
                    });

                sitemap_pages = 0;

                }
            });

            }).run();

            fut['return'](sites_results);

            this.response.writeHead(200, {'Content-Type': 'application/json'});
            this.response.end(JSON.stringify({}));            
        }
    });

    this.route('update_pages', {
        path: '/api/update_pages',
        where: 'server',
        action: function() {
            // GET, POST, PUT, DELETE
            var requestMethod = this.request.method;
            // Data from a POST request
            var requestData = this.request.body;
            
            var pages = Pages.find().fetch();
            var xmlParser = xml2js.Parser();
            var cheerio_parser = cheerio;

            var Fiber = Npm.require('fibers');
            var Future = Npm.require('fibers/future');
            var fut = new Future();

            var sitemap_pages = 0;
            var sites_results = [];

            Fiber(function() {

            _.each(pages, function(content, index) {
                if (content.hasOwnProperty('url')) {
                    var page_url = content.url;

                    HTTP.call('GET', page_url, function(error, requestBody) {
                        var $ = cheerio.load(requestBody.content);                        
                        var text_only = $('body').clone().find("script,noscript,style").remove().end().text();
                        var text_only_clear = text_only.replace(/[\n]{1,}/g,'\<\b\r\/\>').replace(/\s{1,}/g, ' ').replace(/[\<\b\r\/\>\ ]{2,}/g,'<br/>')

                        var insertPage = {
                            cmpid: content.cmpid,
                            sid: content.sid,
                            pid: content['_id'],
                            url: content.url,
                            raw: requestBody.content,
                            title: $('title').html(),
                            text: text_only_clear,
                            md5: CryptoJS.MD5(text_only_clear).toString(),
                            date: moment().format()
                        }

                        var hasMatch = PageUpdates.findOne({
                            cmpid:  insertPage.cmpid,
                            sid:    insertPage.sid,
                            pid:    insertPage.pid,
                            md5:    insertPage.md5
                        });

                        if (hasMatch === undefined) {
                            PageUpdates.insert(insertPage);
                        }
                        
                        sitemap_pages++;

                        sites_results.push({count: sitemap_pages, domain: content.url});
                    });

                sitemap_pages = 0;

                }
            });

            }).run();

            fut['return'](sites_results);

//            return fut.wait();

            this.response.writeHead(200, {'Content-Type': 'application/json'});
            this.response.end(JSON.stringify({}));            
        }
    });

    this.route('update_page_reports', {
        path: '/api/update_page_reports',
        where: 'server',
        action: function() {
            // GET, POST, PUT, DELETE
            var requestMethod = this.request.method;
            // Data from a POST request
            var requestData = this.request.body;
            
            var pages = Pages.find().fetch();
            var xmlParser = xml2js.Parser();
            var cheerio_parser = cheerio;
            var $ = cheerio.load("");                        

            var Fiber = Npm.require('fibers');
            var Future = Npm.require('fibers/future');
            var fut = new Future();

            var jsdiff = JsDiff;

            var sitemap_pages = 0;
            var sites_results = [];

            Fiber(function() {

            _.each(pages, function(content, index) {
                var page_updates_list = PageUpdates.find({pid: content['_id']}, {sort: {"date": 1}}).fetch();

                if (page_updates_list.length != 1) {
                    _.each(page_updates_list, function(content_update, index2) {
                        var next_index = index2 + 1;
                        if (next_index < page_updates_list.length) {
                            var start_data = page_updates_list[index2];
                            var end_data = page_updates_list[next_index];


                            var diff = jsdiff.diffChars(start_data.text, end_data.text);
                            var new_diffed_text = "";
                            diff.forEach(function(part){
                                var color = part.added ? 'green' : part.removed ? 'red' : 'black';
                                if (color == "black") {
                                    new_diffed_text += part.value;
                                } else {
                                    new_diffed_text += "<span style='color: "+color+"'>"+part.value+"</span>";
                                }
                            });

                            delete start_data.raw;
                            delete end_data.raw;

                            var insertPage = {
                                pid:            start_data.pid,
                                sid:            start_data.sid,
                                cmpid:          start_data.cmpid,
                                md5_compare:    start_data.md5 + "_" + end_data.md5,
                                diff:           new_diffed_text,
                                md5:            CryptoJS.MD5(new_diffed_text).toString(),
                                date:           moment().format(),
                                from:           start_data,
                                to:             end_data
                            }

                            var hasMatch = PageReports.findOne({
                                cmpid:          insertPage.cmpid,
                                sid:            insertPage.sid,
                                pid:            insertPage.pid,
                                md5:            insertPage.md5,
                                md5_compare:    insertPage.md5_compare
                            });

                            if (hasMatch === undefined) {
                                PageReports.insert(insertPage);
                            }

                            sitemap_pages++;

                            sites_results.push({count: sitemap_pages, domain: content.url});
                        }
                    });
                }
            });

            }).run();

            fut['return'](sites_results);

            this.response.writeHead(200, {'Content-Type': 'application/json'});
            this.response.end(JSON.stringify({}));            
        }
    });
});
  