/*global angular */

/**
 * Services that persists and retrieves calls from localStorage or a backend API
 * if available.
 *
 * They both follow the same API, returning promises for all changes to the
 * model.
 */
ContactCenter.factory('dataManager', ['$q', '$http', '_', 'moment', function ($q, $http, _, moment) {
	'use strict';

	var STORAGE_ID = 'c1-c2';

	var store = {
		model_id: 'callID',
		calls: [],
		filteredCalls: [],

		/**
		 * Get data from local storage
		 * @param {string} id Identifier for local storage
		 * @returns {mixed}
		 */
		_getFromLocalStorage: function (id) {
			return JSON.parse(localStorage.getItem(STORAGE_ID + '-' + id) || '[]');
		},

		/**
		 * Save data to local storage
		 * @param {string} id Identifier for local storage
		 * @param {object} item Object to save
		 * @returns {void}
		 */
		_saveToLocalStorage: function (id, item) {
			localStorage.setItem(STORAGE_ID + '-' + id, JSON.stringify(item));
		},

		/**
		 * Check if data exists for given identifier
		 * @param {string} id Identifier for local storage
		 * @returns {boolean}
		 */
		inLocalStorage: function (id) {
			return (this._getFromLocalStorage(id)) ? true : false;
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
			var id = 'calls';
			if (store.inLocalStorage(id)) {
				return store.get();
			} else {
				return store.getDummyData();
			}
		},

		/**
		 * Get dummy calls data
		 * @returns {*}
		 */
		getDummyData: function () {
			var deferred = $q.defer(), id = 'calls';
			var url = 'dummy-data/data.json?id=2';
			$http.get(url).success(function (data, status) {

				/*set some informations to reduce working time in future */

				_.forEach(data, function (n, key) {
					var timeA = moment(n.callStart), timeB = moment(n.callEnd);
					n.timeDifference = timeB.diff(timeA, 'minutes');
				});


				//Save data to local storage
				store._saveToLocalStorage(id, data);


				//Do regular get and copy data to store.calls
				deferred.resolve(store.get());
			}).error(function (data, status) {
				deferred.reject(data);
			});

			return deferred.promise;
		},

		/**
		 * Find element by {store.model_id} in {store.calls}
		 * @param {number} id
		 * @returns {*}
		 */
		findById: function (id) {
			var deferred = $q.defer();

			var calls = store.fetchData();
			calls.then(function success(data) {
				var element = _.find(data, function (item) {
					return item[store.model_id] == id;
				});
				deferred.resolve(element);
			}, function error(data) {
				deferred.reject(data);
			})

			return deferred.promise;
		},

		/**
		 * Find element index in {store.calls} by {store.model_id}
		 * @param {number} id
		 * @returns {*}
		 */
		findElementIndexById: function (id) {
			var deferred = $q.defer();

			var calls = store.fetchData();
			calls.then(function success(data) {
				var index = _.findIndex(data, function (item) {
					return item[store.model_id] == id;
				});

				if (index !== -1) {
					deferred.resolve(index);
				} else {
					deferred.reject(index);
				}
			}, function error(data) {
				deferred.reject(data);
			})

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
				return store.filteredCalls;
			}

			var calls = store.fetchData();
			calls.then(function success(data) {
				store.filteredCalls = _.filter(store.calls, function (n) {
					var time = moment(n.callEnd);
					return (!options.score || n.evaluation.totalScore == options.score) &&
						((options.agentID == '' || !options.agentID) || n.agent.agentID.indexOf(options.agentID) != -1) &&
						(!options.duration || n.timeDifference == options.duration) &&
						(!options.callAgo || moment().diff(time, 'days') == options.callAgo);
				});

				deferred.resolve(store.filteredCalls);
			});




			return deferred.promise;
		},

		/**
		 * Get calls data from local storage
		 * @returns {*}
		 */
		get: function () {
			var deferred = $q.defer(), id = 'calls'

			angular.copy(store._getFromLocalStorage(id), store.calls);
			deferred.resolve(store.calls);

			return deferred.promise;
		},

		/**
		 * Update local storage data with single line changes
		 * @param {object} call. Single object from calls {array}
		 * @returns {*}
		 */
		put: function (call) {
			var deferred = $q.defer(), callId = call[store.model_id], id = 'calls';

			store.findElementIndexById(callId).then(function success(index) {
				store.calls[index] = call;
				store._saveToLocalStorage(id, store.calls);
				deferred.resolve(callId);
			}, function error(index) {
				deferred.reject(index);
			});

			return deferred.promise;
		}
	};

	return store;
}]);