angular.module('ContactCenter').controller('CallsItemCtrl', ["$scope", "$routeParams", 'dataManager', '$window', '$timeout',
	function ($scope, $routeParams, dataManager, $window, $timeout) {
	var id = $routeParams.callId;

	$scope.call = {};

		dataManager.findById(id).then(function success(call) {
		console.log(call);
		$scope.call = call;
	});


	$scope.updateItem = function () {
		$scope.call.evaluation.totalScore = (parseInt($scope.call.evaluation.managerScore) + parseInt($scope.call.evaluation.customerScore)) / 2;
		dataManager.put($scope.call).then(function success() {
			alert('Saved');
			$window.history.back();
		}, function error() {
			alert('some error happened');
		});
	};
}]);