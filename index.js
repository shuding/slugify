'use strict';
var escapeStringRegexp = require('escape-string-regexp');
var transliterate = require('./transliterate');

function decamelize(string) {
	return string
		// Separate capitalized words.
		.replace(/([A-Z]{2,})([a-z\d]+)/g, '$1 $2')
		.replace(/([a-z\d]+)([A-Z]{2,})/g, '$1 $2')

		.replace(/([a-z\d])([A-Z])/g, '$1 $2')
		.replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1 $2');
};

function removeMootSeparators(string, separator) {
	var escapedSeparator = escapeStringRegexp(separator);

	return string
		.replace(new RegExp(`${escapedSeparator}{2,}`, 'g'), separator)
		.replace(new RegExp(`^${escapedSeparator}|${escapedSeparator}$`, 'g'), '');
};

module.exports = function (initString) {
	if (typeof initString !== 'string') {
		throw new TypeError(`Expected a string, got \`${typeof initString}\``);
	}

	var str = initString;
	str = transliterate(str, {customReplacements: [['&', ' and ']]});
	str = decamelize(str);
	str = str.toLowerCase();

	var patternSlug = /[^a-z\d]+/g;
	str = str.replace(patternSlug, '-');
	str = str.replace(/\\/g, '');
	str = removeMootSeparators(str, '-');

	return str;
};
