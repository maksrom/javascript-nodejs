module.exports = function() {
  return {
    "port": 3000,
    "mongoose": {
      "uri": "mongodb://localhost/javascript",
      "options": {
        "server": {
          "socketOptions": {
            "keepAlive": 1
          },
          "poolSize": 5
        }
      }
    },
    "session": {
      "secret": "KillerIsJim",
      "key": "sid",
      "cookie": {
        "path": "/",
        "httpOnly": true,
        "maxAge": null
      }
    },
    "log": {
      "format": "default"
    }
  }
};