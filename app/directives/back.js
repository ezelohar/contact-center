/* managing backbutton*/
angular.module('ContactCenter').directive('back', ['$window', function($window) {
	return {
		restrict: 'A',
		link: function (scope, elem, attrs) {
			elem.bind('click', function () {
				var c = confirm('are you sure? All changes will be lost!!!');
				if (c) {
					$window.history.back();
				}

			});
		}
	};
}]);