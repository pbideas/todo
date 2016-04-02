'use strict';

var constants = require('./constants');

module.exports = {
    getDbConnectionString: function() {
        if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
             return 'mongodb://' + process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
                process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
                process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
                process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
                process.env.OPENSHIFT_APP_NAME;
        }

        return 'mongodb://' + constants.dbUser + ':' + constants.dbPassword + '@' + constants.dbUrl;
    }
};