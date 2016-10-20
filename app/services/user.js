angular.module('webchat')
    .factory('UserResource', ['$resource', 'API', function($resource, API) {
        var url = API + '/signup'
        var params = {};
        var methods = {
            signup: {method: 'POST', url: url}
        };
        return $resource(url, params, methods);
    }])
    .factory('User', ['$rootScope', 'UserResource', function($rootScope, UserResource) {
        var user;
        return {
            signup: signup,
            user: getUser
        };

        function signup(username) {
            UserResource.signup({username: username}).$promise.then(function(data) {
                user = data.user;
                console.log("USER: ", user);
                $rootScope.$emit("SIGNEDUP");
            }).catch(function(error) {
                console.log("ERROR: user.signup ", error);
            });
        }

        function getUser() {
            return user;
        }

    }]);