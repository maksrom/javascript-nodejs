var mongoose = require('lib/mongoose'),
  Schema = mongoose.Schema;

var schema = new Schema({
  session: {
    type: String,
    required: true
  },
  expires: {
    type: Date,
    required: true,
    index: true
  }
});

mongoose.model('Session', schema);
