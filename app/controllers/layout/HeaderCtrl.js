angular.module('ContactCenter').controller('HeaderCtrl',['$scope','$location',   function($scope, $location) {
	$scope.isActive = function (path) {
		var active = (path === $location.path());
		return active;
	};
}]);