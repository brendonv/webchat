angular.module("webchat")
    .controller("MainCtrl", ["$scope", "User", "MessageResource", "Poller", function($scope, User, MessageResource, Poller) {

        console.log("MAIN PAGER");

        $scope.user = User.user();

        $scope.input = {
            value: ""
        };

        $scope.messages = [
            "messageOne",
            "messageTwo",
            "messageThree",
            "messageFour",
            "messageFive"
        ];

        function startPoller() {
            Poller.poll(10* 1000, function (data) {
                console.log("POLLER RETURN: ", data);
                messages.append(data);
            });
        }

        $scope.userInput = function() {
            console.log($scope.input.value);
        };

        $scope.sendMessage = function() {
            console.log("SEND: ", $scope.input.value)
            MessageResource.create({content:$scope.input.value}).$promise.then(function(data) {
                console.log("MESSAGE CREATE: ", data);
            }).catch(function(error) {
                console.log("ERROR: main.sendMessage", error);
            });
        };

        $scope.$watch("user", function(newValue, oldValue) {
            console.log("user value change", newValue, oldValue);
        });



    }]);