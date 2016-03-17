'use strict';

module.exports = {
  development: {
    MONGODB_URI: "mongodb://localhost:27017/useracl",
    ESDB_URI: "http://192.168.0.151:9200/demo",
    PORT: process.env.PORT || 3000
  },
  test: {
    MONGODB_URI: "mongodb://localhost:27017/tvexiere",
    ESDB_URI: "http://192.168.0.151:9200/tvexiere",
    PORT: process.env.PORT || 3000 /// ? do we need configurable port through code or env specific
  }
};
