/*
 * The main ContactCenter app module
 *
 * @type {angular.Module}
 */
var ContactCenter = angular.module('ContactCenter', [
	'ngRoute',
	'angularMoment',
	'lodash',
	'angularUtils.directives.dirPagination'
]);

angular.module('ContactCenter').config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'app/views/calls-list.html',
				controller: 'CallsListCtrl'
			}).
			when('/call/:callId', {
				templateUrl: 'app/views/calls-item.html',
				controller: 'CallsItemCtrl'
			}).
			when('/about', {
				templateUrl: 'app/views/about.html',
				controller: 'AboutCtrl'
			}).
			when('/info', {
				templateUrl: 'app/views/info.html',
				controller: 'InfoCtrl'
			}).
			otherwise({
				redirectTo: '/'
			});
	}]);


angular.module('ContactCenter').config(function(paginationTemplateProvider) {
	paginationTemplateProvider.setPath('bower_components/angular-utils-pagination/dirPagination.tpl.html');
});

/*

Steps to do

1. Create controller which will fetch data
2. Display data
3. Create pagination
4.
 */

/* missing to finish

15. Test on Djurdja's comp
16. Test on Different Browsers
18. Compile all
19. Push to git
20. Write Readme.md
21. Loading App page

 */
angular.module('ContactCenter').controller('AboutCtrl',['$scope',   function($scope) {

}]);

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
angular.module('ContactCenter').controller('InfoCtrl',['$scope',   function($scope) {

}]);

angular.module('ContactCenter').controller('HeaderCtrl',['$scope','$location',   function($scope, $location) {
	$scope.isActive = function (path) {
		var active = (path === $location.path());
		return active;
	};
}]);
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
/**
 * Play audio file. Directive used to communicate with player
 * To change files and stop/play them
 */

angular.module('ContactCenter').directive('play', function () {
		'use strict';
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				elem.bind('click', function (event) {
					var holder = elem.parents('#main');
					var player = holder.find('audio');

					player.css('display', 'block');

					/* id of current call playing */
					var currentPlayingID = player.attr('data-player');

					/* We toggle element class on click */
					elem.toggleClass('play');

					/* Same button case, no new play instancing */
					if (currentPlayingID == attrs.callId) {
						if (player[0].duration > 0 && !player[0].paused) {
							player[0].pause();
						} else {
							player[0].play();
						}
					} else {
						/* if is playing */
						if (player[0].duration > 0 && !player[0].paused) {
							player[0].pause();
							holder.find('#play_' + currentPlayingID).toggleClass('play');
						}

						/* bind data to template for new song */
						scope.$apply(attrs.play);

						player[0].load();
						player[0].play();
					}

				});
			}
		};
	});
/**
 * Manage table buttons for player events on pause and play
 */
angular.module('ContactCenter').directive('playerManager', function () {
	'use strict';
	return {
		restrict: 'A',
		link: function(scope, elem, attrs) {
			var holder = elem.parents('#main');
			elem.bind('pause', function (event) {
				var currentPlayingID = attrs.player, element = holder.find('#play_' + currentPlayingID);

				if (element.hasClass('play')) {
					holder.find('#play_' + currentPlayingID).toggleClass('play');
				}
			}).bind('play', function (event) {
				var currentPlayingID = attrs.player, element = holder.find('#play_' + currentPlayingID);

				if (!element.hasClass('play')) {
					holder.find('#play_' + currentPlayingID).toggleClass('play');
				}
			});
		}
	};
});
angular.module('ContactCenter').filter('capitalize', function () {
	return function (input, scope) {
		if (input !== null) {
			input = input.toLowerCase();
		}
		return input.substring(0, 1).toUpperCase() + input.substring(1);
	};
});

angular.module('ContactCenter').filter('embedUrl', function ($sce) {
	return function(audioFile) {
		if (audioFile !== null) {
			return $sce.trustAsResourceUrl('http://www.kosamja.com/mp3s/' + audioFile);
		} else {
			return null;
		}

	};
});
/*global angular */

/**
 * Services that persists and retrieves calls from localStorage or a backend API
 * if available.
 *
 * They both follow the same API, returning promises for all changes to the
 * model.
 */
angular.module('ContactCenter').factory('dataManager', ['$q', '$http', '_', 'moment', function ($q, $http, _, moment) {
	'use strict';

	var STORAGE_MAPPER = 'zoom-contact-center';

	var store = {
		modelID: 'callID',
		calls: [],
		callsStoreID: 'calls',
		filteredCalls: [],

		/**
		 * Get data from local storage
		 * @param {string} id Identifier for local storage
		 * @returns {mixed}
		 */
		_getFromLocalStorage: function (storeID) {
			return JSON.parse(localStorage.getItem(STORAGE_MAPPER + '-' + storeID) || '[]');
		},

		/**
		 * Save data to local storage
		 * @param {string} id Identifier for local storage
		 * @param {object} item Object to save
		 * @returns {void}
		 */
		_saveToLocalStorage: function (storeID, item) {
			localStorage.setItem(STORAGE_MAPPER + '-' + storeID, JSON.stringify(item));
		},

		/**
		 * Check if data exists for given identifier
		 * @param {string} id Identifier for local storage
		 * @returns {boolean}
		 */
		inLocalStorage: function (storeID) {
			if (!storeID) {
				storeID = store.callsStoreID;
			}

			return (!_.isEmpty(this._getFromLocalStorage(storeID))) ? true : false;
		},

		/**
		 * Empty all data in calls variable
		 * @returns {void}
		 */
		clearCalls: function () {
			store.calls = [];
		},

		/**
		 * Fetch calls data from local storage or dummy back-end data
		 * @returns {deferred}
		 */
		fetchData: function () {
			if (store.inLocalStorage()) {
				return store.get();
			} else {
				return store.getDummyData();
			}
		},

		/**
		 * Save data to local storage and local variable
		 * @param {Array} data
		 * @returns {Array}
		 */
		saveCalls: function (data) {
			store._saveToLocalStorage(store.callsStoreID, data);
			angular.copy(data, store.calls);

			return store.calls;
		},

		/**
		 * Get dummy calls data
		 * @returns {*}
		 */
		getDummyData: function () {
			var deferred = $q.defer(), id = 'calls';
			var url = 'dummy-data/data.json?id=2';
			$http.get(url).success(function (data) {
				if (data.success) {

					/*set some informations to reduce working time in future */

					_.forEach(data.data, function (n, key) {
						var timeA = moment(n.callStart), timeB = moment(n.callEnd);
						n.timeDifference = timeB.diff(timeA, 'minutes');
					});




					//Do regular get and copy data to store.calls
					deferred.resolve(store.saveCalls(data.data));
				} else {
					deferred.reject(data);
				}
			}).error(function (data, status) {
				deferred.reject(data);
			});

			return deferred.promise;
		},

		/**
		 * Find element by {store.modelID} in {store.calls}
		 * @param {number} id
		 * @returns {*}
		 */
		findById: function (id) {
			var deferred = $q.defer();

			var calls = store.fetchData();
			calls.then(function success(data) {
				var element = _.find(data, function (item) {
					return item[store.modelID] == id;
				});
				deferred.resolve(element);
			}, function error(data) {
				deferred.reject(data);
			});

			return deferred.promise;
		},

		/**
		 * Find element index in {store.calls} by {store.modelID}
		 * @param {number} id
		 * @returns {*}
		 */
		findElementIndexById: function (id) {
			var deferred = $q.defer();

			var calls = store.fetchData();
			calls.then(function success(data) {
				var index = _.findIndex(data, function (item) {
					return item[store.modelID] == id;
				});

				if (index !== -1) {
					deferred.resolve(index);
				} else {
					deferred.reject(index);
				}
			}, function error(data) {
				deferred.reject(data);
			});

			return deferred.promise;
		},

		/**
		 * Filter data by given options
		 * @param {object} options Object to compare for filter
		 * @param {boolean} reset if true, filtered data will be reseted
		 * @returns {*}
		 */
		filterData: function (options, reset) {
			var deferred = $q.defer();

			if (!reset && store.filteredCalls.length) {
				deferred.resolve(store.filteredCalls);
			} else {
				var calls = store.fetchData();
				calls.then(function success(data) {
					store.filteredCalls = _.filter(store.calls, function (n) {
						var time = moment(n.callEnd);
						return (!options.score || n.evaluation.totalScore == options.score) &&
							((options.agentID === '' || !options.agentID) || n.agent.agentID.indexOf(options.agentID) != -1) &&
							(!options.duration || n.timeDifference == options.duration) &&
							(!options.callAgo || moment().diff(time, 'days') == options.callAgo);
					});

					deferred.resolve(store.filteredCalls);
				});
			}


			return deferred.promise;
		},

		/**
		 * Get calls data from local storage
		 * @returns {*}
		 */
		get: function () {
			var deferred = $q.defer();

			angular.copy(store._getFromLocalStorage(store.callsStoreID), store.calls);
			deferred.resolve(store.calls);

			return deferred.promise;
		},

		/**
		 * Update local storage data with single line changes
		 * @param {object} call. Single object from calls {array}
		 * @returns {*}
		 */
		put: function (call) {
			var deferred = $q.defer(), callId = call[store.modelID];

			store.findElementIndexById(callId).then(function success(index) {
				store.calls[index] = call;
				store._saveToLocalStorage(store.callsStoreID, store.calls);
				deferred.resolve(callId);
			}, function error(index) {
				deferred.reject(index);
			});

			return deferred.promise;
		}
	};

	return store;
}]);
/* embeding lodash library to use it in angular */
var lodash = angular.module('lodash', []);
lodash.factory('_', function() {
	return window._; //Underscore must already be loaded on the page
});