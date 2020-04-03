'use strict';
var escapeStringRegexp = require('escape-string-regexp');
var transliterate = require('@sindresorhus/transliterate');
var builtinOverridableReplacements = require('./overridable-replacements');

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

module.exports = function (string, options) {
	if (typeof string !== 'string') {
		throw new TypeError(`Expected a string, got \`${typeof string}\``);
	}

	options = Object.assign({
		separator: '-',
		lowercase: true,
		decamelize: true,
		customReplacements: [],
		preserveLeadingUnderscore: false,
	}, options);

	var shouldPrependUnderscore = options.preserveLeadingUnderscore && string.startsWith('_');

	var customReplacementsArray = options.customReplacements instanceof Map
		? Array.from(options.customReplacements.entries())
		: options.customReplacements;
	
	var customReplacements = new Map(
		[].concat(builtinOverridableReplacements).concat(customReplacementsArray).filter(Boolean),
	);

	string = transliterate(string, {customReplacements});

	if (options.decamelize) {
		string = decamelize(string);
	}

	var patternSlug = /[^a-zA-Z\d]+/g;

	if (options.lowercase) {
		string = string.toLowerCase();
		patternSlug = /[^a-z\d]+/g;
	}

	string = string.replace(patternSlug, options.separator);
	string = string.replace(/\\/g, '');
	string = removeMootSeparators(string, options.separator);

	if (shouldPrependUnderscore) {
		string = `_${string}`;
	}

	return string;
};
