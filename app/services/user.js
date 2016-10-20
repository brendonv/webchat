angular.module('webchat')
    .factory('UserResource', ['$resource', 'API', function($resource, API) {
        var url = API + '/signup'
        var params = {};
        var methods = {
            signup: {method: 'POST', url: url}
        };
        return $resource(url, params, methods);
    }])
    .factory('User', ['$rootScope', 'UserResource', 'store', function($rootScope, UserResource, store) {

        return {
            signup: signup
        };

        function signup(username) {

        }

    }]);