const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const shortid  = require('shortid');

const ThemeSchema   = new Schema({
	title: String,
	description: String,
  order: Number
});

module.exports = mongoose.model('Theme', ThemeSchema);
