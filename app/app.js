var app = angular.module('webchat', [
  'ngRoute', 'ngResource', 'templates'
]);

app.config(['$routeProvider', '$httpProvider', '$locationProvider', function($routeProvider, $httpProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider
    .when('*', {
      templateUrl: 'main.html',
      controller: 'MainCtrl'
    });
    
}]);

angular.module('templates', []);