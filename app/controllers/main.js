angular.module("webchat")
    .controller("MainCtrl", ["$scope", function($scope) {

        console.log("MAIN PAGER");

        $scope.input = {
            value: ""
        };

        $scope.userInput = function() {
            console.log("USER INPUT", $scope.input.value);
        };

        $scope.sendMessage = function() {

        }

    }]);