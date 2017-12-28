!(function() {
    'use strict';
    
    var Configuration = {
    	siteUrl: 'http://localhost:2149',
		database: {
            mysql: {
                host: '',
                user: '',
                password: '',
                db: ''
            },
            mongodb: {
              	url: 'mongodb://anjaligt19:12345678@ds157444.mlab.com:57444/mongo_db'
            }
        }
     };
    module.exports = Configuration;
})();
