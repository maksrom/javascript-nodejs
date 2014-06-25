var async = require('async');
var config = require('config');
var models = require('lib/mongoose').models;
var subscriptionStore = require('lib/subscriptionStore').store;

describe("Subscription",function() {

  this.timeout(5000);

  before(function(done) {
    var testData = require('test/data');
    testData.loadDb('sampleDb', done);
  });

  var subscription, subscription2;
  var receivedMessages = [];
  it("gets old messages", function(done) {
    subscription = subscriptionStore.createSubscription(models.Message.find({user:'000000000000000000000002'}));
    subscription.on('data', function(message) {
      receivedMessages.push(message);
    });

    setTimeout(function() {
      receivedMessages.length.should.equal(2);
      done();
    }, 100);
  });

  it("gets new messages", function(done) {

    async.series([
      function(callback) {
        new models.Message({
          user: '000000000000000000000002',
          content: 'MESSAGE FROM QUERY'
        }).save(callback);
      },
      function(callback) {
        new models.Message({
          user: '000000000000000000000002',
          content: 'MESSAGE FROM QUERY'
        }).save(callback);
      },
      function(callback) {
        new models.Message({
          user: '000000000000000000000001',
          content: 'MESSAGE NOT IN QUERY'
        }).save(callback);
      },
      function(callback) {
        setTimeout(callback, 50);
      },
      function(callback) {
        receivedMessages.length.should.equal(4);
        callback();
      }
    ], done);

  });

  it("add one more", function(done) {
    subscription2 = subscriptionStore.createSubscription(models.Message.find({user:'000000000000000000000003'}));
    subscription2.on('data', function(message) {
      receivedMessages.push(message);
    });

    setTimeout(function() {
      receivedMessages.length.should.equal(7);
      done();
    }, 100);
  });


  it("receives from both", function(done) {
    async.series([
      function(callback) {
        new models.Message({
          user: '000000000000000000000002',
          content: 'MESSAGE FROM QUERY'
        }).save(callback);
      },
      function(callback) {
        new models.Message({
          user: '000000000000000000000003',
          content: 'MESSAGE FROM QUERY'
        }).save(callback);
      },
      function(callback) {
        new models.Message({
          user: '000000000000000000000001',
          content: 'MESSAGE NOT IN QUERY'
        }).save(callback);
      },
      function(callback) {
        setTimeout(callback, 100);
      },
      function(callback) {
        receivedMessages.length.should.equal(9);
        callback();
      }
    ], done);
  });


});