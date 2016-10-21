angular.module('webchat')
    .directive('wcSignup', [function() {
        return {
            scope: {},
            replace: true,
            templateUrl: 'wc-signup.html',
            controller: ["$scope", "$rootScope", "User", function($scope, $rootScope, User) {
                $scope.user = {
                    username: ""
                };

                $scope.signup = function() {
                    User.signup($scope.user.username);
                };
            }]
        };
    }]);
    