/* embeding lodash library to use it in angular */
var lodash = angular.module('lodash', []);
lodash.factory('_', function() {
	return window._; //Underscore must already be loaded on the page
});