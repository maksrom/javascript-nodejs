var mongoose = require('lib/mongoose');
var async = require('async');
var log = require('lib/log')(module);

var db = mongoose.connection.db;

function createEmptyDb(callback) {

  async.series([
    function open(callback) {
      if (mongoose.connection.readyState == 1) { // already connected
        return callback();
      } else {
        mongoose.connection.on('open', callback);
      }
    },
    function clearDatabase(callback) {

      // db.dropDatabase reallocates file and is slow
      // that's why we drop collections one-by-one

      db.collectionNames(function(err, collections) {

        async.each(collections, function(collection, callback) {
          var collectionName = collection.name.slice(db.databaseName.length + 1);
          if (collectionName.indexOf('system.') === 0) {
            return callback();
          }
          log.debug("drop ", collectionName);
          db.dropCollection(collectionName, callback);
        }, callback);

      });

    },
    function ensureIndexes(callback) {
      // models must be recreated
      // but that's problematic
      // so we just make sure all necessary features are in place
      async.each(mongoose.modelNames(), function(modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
      }, callback);
    },
    function ensureCapped(callback) {
      // models must be recreated
      // but that's problematic
      // so we just make sure all necessary features are in place
      async.each(mongoose.modelNames(), function(modelName, callback) {
        var schema = mongoose.models[modelName].schema;
        if (!schema.options.capped) return callback();
        db.command({convertToCapped: mongoose.models[modelName].collection.name, size: schema.options.capped}, callback);
      }, callback);
    }
  ], function(err) {
    callback(err);
  });
}

exports.createEmptyDb = createEmptyDb;

/**
 * Clear database,
 * require models & wait until indexes are created,
 * then load data from test/data/dataFile.json & callback
 * @param dataFile
 * @param callback
 */
exports.loadDb = function(dataFile, callback) {
  // warning: pow-mongoose-fixtures fails to work with capped collections
  // it calls remove() on them => everything dies
  async.series([
    createEmptyDb,
    function fillDb(callback) {
      var modelsData = require('test/data/' + dataFile);

      async.each(Object.keys(modelsData), function(modelName, callback) {
        loadModel(modelName, modelsData[modelName], callback);
      }, callback);
    }
  ], function(err) {
    callback(err);
  });

};

function loadModel(name, data, callback) {

  var Model = mongoose.models[name];

  async.each(data, function(itemData, callback) {
    var model = new Model(itemData);
    model.save(callback);
  }, callback);

}