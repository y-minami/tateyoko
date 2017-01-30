const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const shortid  = require('shortid');

const SenriuSchema   = new Schema({
	urlId: {
		type: String,
		default: shortid.generate
	},
	themeId: String,
	author: String,
	col1: String,
	col2: String,
	col3: String,
	update: Date
});

module.exports = mongoose.model('Senriu', SenriuSchema);
