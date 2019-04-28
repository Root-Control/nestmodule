'use strict';

const capitalizeText = text => {
	return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
};


const lowerCaseText = text => {
	return text.toLowerCase();
};

const upperCaseText = text => {
	return text.toUpperCase();
};


module.exports = {
	capitalizeText,
	lowerCaseText,
	upperCaseText
}
