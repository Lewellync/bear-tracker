var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var BearSchema = new Schema({
  name:       String,
  birth:      {type: Date, default: Date.now},
  death:      {type: Date, default: "1/1/1900"},
  killcount:  Number,
  address:    String,
  xpos:       Number,
  ypos:       Number
});

module.exports = mongoose.model('Bear', BearSchema)
