var models = require('mongoose').models;
var async = require('async');
var config = require('config');
var io = require('socket.io-client');
var querystring = require('querystring');
var should = require('should');

var socketOptions ={
  transports: ['xhr-polling'],
  'force new connection': true
};

var url = 'http://localhost:' + config.get('port');

function openSessionSocket(sid) {
  var clientOptions = {};
  for(var key in socketOptions) {
    clientOptions[key] = socketOptions[key];
  }
  var query = {};
  query[config.get('session:key')] = sid;

  clientOptions.query = querystring.stringify(query);
  return io.connect('http://localhost:' + config.get('port'), clientOptions);
}

describe("Socket",function() {

  before(function(done) {
    var testData = require('test/data');
    testData.loadDb('sampleDb', done);
  });

  var anon;
  var ilya, tester, vasya;
  var ilyaId = '000000000000000000000001';
  var testerId = '000000000000000000000002';
  var vasyaId = '000000000000000000000003';

  it("can open connect with invalid session", function(done) {
    anon = openSessionSocket('FFFFFFFFFFFFFF0000000011');
    anon.on('connect', function() {
      done();
    })
  });

  it("anon user may not create a message", function(done) {
    anon.emit('message:create', {content: "ANON MESSAGE"}, function(err) {
      err.status.should.equal(403);
      done();
    });
  });

  describe("two users", function() {

    before(function(done) { // connect two clients before tests
      async.parallel([
        function(callback) {
          ilya = openSessionSocket('200000000000000000000001');
          ilya.on('connect', callback);
        },
        function(callback) {
          tester = openSessionSocket('200000000000000000000002');
          tester.on('connect', callback);
        },
        function(callback) {
          vasya = openSessionSocket('200000000000000000000003');
          vasya.on('connect', callback);
        }
      ], done);
    });

    it('should be able to create a message', function(done){
      ilya.emit('message:create', {content: "NEW ILYA MESSAGE"}, function(err, message) {
        should.equal(err, null);
        message.content.should.equal("NEW ILYA MESSAGE");
        done();
      });
    });

    var receivedMessages = [];
    var subscriptions = {};

    it('tester subscribes to vasya', function(done) {
      async.waterfall([
        function(callback) {
          tester.emit('message:subscribe', {userId: vasyaId}, callback);
        },
        function getOldMessages(id, callback) {
          subscriptions.vasya = id;

          tester.on('message:create', function(message) {
            receivedMessages.push(message);
            if (receivedMessages.length == 3) callback();
          });

        },
        function(callback) {
          setTimeout(callback, 20);
        },
        function(callback) {
          // only 3 messages, no more!
          receivedMessages.length.should.equal(3);

          vasya.emit('message:create', {content: "NEW VASYA MESSAGE"}, function(err, message) {
            should.equal(err, null);
            message.content.should.equal("NEW VASYA MESSAGE");
            // timeout for subscriber to react
            setTimeout(callback, 30);
          });
        },
        function(callback) {
          receivedMessages.length.should.equal(4);
          tester.removeAllListeners('message:create');
          callback();
        }

      ], done);
    });

    // NOW tester is subscribed to vasya

    it('tester subscribes to ilya', function(done) {
      async.waterfall([
        function(callback) {
          tester.emit('message:subscribe', {userId: ilyaId}, callback);
        },
        function(id, callback) {
          subscriptions.ilya = id;

          tester.on('message:create', function(message) {
            receivedMessages.push(message);
            if (receivedMessages.length == 6) callback();
          });

        },
        function(callback) {
          setTimeout(callback, 20);
        },
        function(callback) {
          receivedMessages.length.should.equal(6);

          ilya.emit('message:create', {content: "NEW ILYA MESSAGE 2"}, function(err, message) {
            should.equal(err, null);
            message.content.should.equal("NEW ILYA MESSAGE 2");
            // timeout for subscriber to react
            setTimeout(callback, 300);
          });
        },
        function(callback) {
          receivedMessages.length.should.equal(7);
          callback();
        }

      ], done);
    });

    // NOW tester is subscribed to ilya AND vasya

    it('tester unsubscribes from vasya', function(done) {
      var oldReceivedCount = receivedMessages.length;

      async.waterfall([
        function(callback) {
          tester.emit('message:unsubscribe', subscriptions.vasya, callback);
        },

        function(id, callback) {

          should.equal(id, subscriptions.vasya);
          delete subscriptions.vasya;

          vasya.emit('message:create', {content: "NEW VASYA MESSAGE"}, function(err, message) {
            should.equal(err, null);
            message.content.should.equal("NEW VASYA MESSAGE");
            // timeout for subscriber to react
            setTimeout(callback, 30);
          });
        },

        function(callback) {
          // no new messages from vasya (unsubscribed)
          oldReceivedCount.should.equal(receivedMessages.length);

          ilya.emit('message:create', {content: "NEW ILYA MESSAGE 3"}, function(err, message) {
            should.equal(err, null);
            message.content.should.equal("NEW ILYA MESSAGE 3");
            // timeout for subscriber to react
            setTimeout(callback, 100);
          });
        },
        function(callback) {
          receivedMessages.length.should.be.equal(oldReceivedCount + 1);
          tester.removeAllListeners('message:create');
          tester.emit('message:unsubscribe', subscriptions.ilya, callback);
          delete subscriptions.ilya;
        }
      ], done);
    });

    // NOW tester is not subscribed to anything

    it('tester subscribes to vasya & following', function(done) {
      var oldReceivedCount = receivedMessages.length;
      async.waterfall([
        function(callback) {
          tester.emit('message:subscribe', {userId: vasyaId, following: true}, callback);
        },
        function(id, callback) {
          subscriptions.vasya = id;
          // skip old messages
          setTimeout(callback, 60);
        },
        function(callback) {

          tester.on('message:create', function(message) {
            receivedMessages.push(message);
          });

          async.series([
            function(callback) {
              vasya.emit('message:create', {content: "NEW VASYA MESSAGE"}, callback);
            },
            function(callback) {
              ilya.emit('message:create', {content: "NEW ILYA MESSAGE"}, callback);
            }
          ], function(err) {
            callback(err);
          });
        },
        function(callback) {
          // skip old messages
          setTimeout(callback, 60);
        },
        function(callback) {
          receivedMessages.length.should.equal(oldReceivedCount + 2);
          tester.removeAllListeners('message:create');
          callback();
        }

      ], done);

    });

    // NOW tester is subscribed to vasya & following

  });



  after(function(done) {
    async.each([anon, ilya, vasya, tester], function(user, callback) {
      if (!user) return callback(); // if error while opening the socket
      user.on('disconnect', callback);
      user.disconnect();
    }, function() {
      // disconnect sends the packet and triggers event synchronously,
      // we use timeout 10 to let the packet actually leave the client process
      setTimeout(done, 10) });
  });

});