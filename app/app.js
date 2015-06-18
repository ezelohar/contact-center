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
