angular.module('webchat')
    .directive('wcSignup', [function() {
        return {
            scope: {},
            replace: true,
            templateUrl: 'wc-signup.html',
            controller: ["$scope", "$rootScope", "$sanitize", "User", function($scope, $rootScope, $sanitize, User) {
                $scope.user = {
                    username: ""
                };

                $scope.signup = function() {
                    User.signup($sanitize($scope.user.username));
                };
            }]
        };
    }]);
    