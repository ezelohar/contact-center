angular.module('ContactCenter').controller('CallsListCtrl',['$scope', 'dataManager', '$timeout', function($scope, dataManager, $timeout) {
	$scope.calls = [];

	/* controller config data */

	/* filter object */
	$scope.search = {
		agentID: '',
		score: 0,
		duration: 0,
		callAgo: 0
	};

	/* search text model */
	$scope.searchText = '';

	/* isLoading  ident */
	$scope.loading = 'loading';

	/** @TODO **
	 * Player data needs to be fixed
	 * Settings for default player information
	 */
	$scope.playerSettings = {
		callMp3 : 	'item_3.mp3',
		playerID:	'none'
	};

	/**
	 * Set player data
	 * @param {string} item mp3 song id
	 * @param {number} id current playing object id
	 * return {void}
	 */
	$scope.setPlay = function (item, id) {

		$scope.playerSettings.callMp3 = item;
		$scope.playerSettings.playerID = id;
	};


	/**
	 * Get data based on filter information
	 * @param {boolean} reset. If true, reset filtered data cache
	 * @return {void}
	 */
	$scope.getData = function (reset) {
		var dataDeferred;
		if (!reset) {
			reset = false;
		}

		$scope.loading = 'loading';


		if (!dataManager.inLocalStorage('filters')) {
			dataDeferred = dataManager.fetchData();
		} else {
			$scope.search = dataManager._getFromLocalStorage('filters');
			dataDeferred = dataManager.filterData($scope.search, reset);
		}

		dataDeferred.then(function success(data) {
			/* simulating loading time */
			$timeout(function () {
				$scope.loading = '';
				$scope.calls = data;
			}, 1000);

		});


	};


	/**
	 * Set filter information and reload data to display filtered data
	 * @param {object} data
	 * @return {void}
	 */
	$scope.searchAction = function (data) {
		dataManager._saveToLocalStorage('filters', data);
		$scope.getData(true);
	};


	$scope.resetFilter = function () {
		$scope.search = {
			agentID: '',
			score: 0,
			duration: 0,
			callAgo: 0
		};
		dataManager._saveToLocalStorage('filters', null);
		$scope.getData(true);
	};


	/* Get Calls data */
	$scope.getData();
}]);