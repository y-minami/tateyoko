const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const shortid  = require('shortid');

var SenriuSchema   = new Schema({
	urlId: {
		type: String,
		default: shortid.generate
	},
	author: String,
	col1: String,
	col2: String,
	col3: String,
	update: Date
});

module.exports = mongoose.model('Senriu', SenriuSchema);
