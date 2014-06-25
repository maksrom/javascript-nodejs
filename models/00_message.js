var mongoose = require('lib/mongoose'),
  Schema = mongoose.Schema;
var EventEmitter = require('events').EventEmitter;

var log = require('lib/log')(module);

var schema = new Schema({
  content: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now,
    index: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // ref: "model to use for population"
    required: true,
    index: true
  }
}, { capped: 100 }); // can archive from capped by another reading thread

schema.methods.toPublicObject = function() {
  return {
    content: this.get('content'),
    created: this.get('created'),
    id: this.id,
    user: this.get('user').toPublicObject()
  };
};

// don't export anything, mongoose.models should be used
// this way I can recreate the model any time
mongoose.model('Message', schema);

