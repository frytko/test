angular
	.module('app',[
		'ui.router','ui.bootstrap', 'app.directives.contactCard'
	])
	.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider){
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'templates/home.html',
				controller: 'homeCtrl'
				})
			.state('about', {
				url: '/about',
				templateUrl: 'templates/about.html',
				controller:'aboutCtrl'
			})
			.state('contact', {
				url: '/contact',
				templateUrl: 'templates/contact.html',
				controller: 'contactCtrl',
				resolve: {
					items: ['$http', function($http){
						return $http.get('test/items.json').then(function(response){
							return response.data;
						})
					}]
				}
			})
	}])