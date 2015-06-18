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


			console.log(store.calls);
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
				console.log(osa);
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