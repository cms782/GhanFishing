var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({

})

var msgSchema = new Schema({
	message: String,
	user: Schema.ObjectId //???

})