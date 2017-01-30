const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ThemeOrderSchema   = new Schema({
	themeIds: Array
});

module.exports = mongoose.model('ThemeOrder', ThemeOrderSchema);
