var app = angular.module('webchat', [
  'ngRoute', 'ngResource', 'ngMessages', 'ngAnimate', 'ngAria', 'templates', 'angular-jwt'
]);

app.config(['$routeProvider', '$httpProvider', '$locationProvider', function($routeProvider, $httpProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $httpProvider.interceptors.push('authInterceptor');

  $routeProvider
    .when('/', {
      templateUrl: 'landing.html',
      controller: 'LandingCtrl'
    })
    .otherwise({
      redirectTo: '/'
    })
    
}]);

app.run(['$rootScope', '$location', 'store', 'jwtHelper', function($rootScope, $location, store, jwtHelper) {
  // This events gets triggered on refresh or URL change
  $rootScope.$on('$locationChangeStart', function() {
    var token = store.get('token');
    if (token) {
      console.log("token");
      if (!jwtHelper.isTokenExpired(token)) {
        console.log("token good");
        // if (!auth.isAuthenticated) {
        //   auth.authenticate(store.get('profile'), token);
        // }
      } else {
        // Either show Login page or use the refresh token to get a new idToken
        console.log("token expired");
        $location.path("/");
      }
    } else {
      console.log("no token");
      $location.path("/");
    }

  });
}]);

angular.module('templates', []);