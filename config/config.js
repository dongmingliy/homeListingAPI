var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'opendoor-practice'
    },
    port: 3000,
    db: 'mongodb://localhost:27017/local'
  },

  test: {
    root: rootPath,
    app: {
      name: 'opendoor-practice'
    },
    port: 3000,
    db: 'mongodb://lli:sa@ds045734.mongolab.com:45734/opendoor-demo'
  },

  production: {
    root: rootPath,
    app: {
      name: 'opendoor-practice'
    },
    port: 3000,
    db: 'mongodb://lli:sa@ds045734.mongolab.com:45734/opendoor-demo'
  }
};

module.exports = config[env];
