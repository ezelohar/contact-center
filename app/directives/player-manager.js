ContactCenter.directive('player-manager', function () {
	'use strict';
	return {
		restrict: 'A',
		link: function(scope, elem, attrs) {
			elem.bind('ended', function (event) {
				console.log('test');
			});
		}
	};
});