var app = angular.module('webchat', [
  'ngRoute', 'ngResource', 'templates'
]);

app.config(['$routeProvider', '$httpProvider', '$locationProvider', function($routeProvider, $httpProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', {
      templateUrl: 'landing.html',
      controller: 'LandingCtrl'
    })
    .otherwise({
      redirectTo: '/'
    })
    
}]);

angular.module('templates', []);