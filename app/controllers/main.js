angular.module("webchat")
    .controller("MainCtrl", ["$scope", "MessageResource", "Poller", function($scope, MessageResource, Poller) {

        console.log("MAIN PAGER");

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

        Poller.poll(10* 1000, function (data) {
            messages.append(data);
        })

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
        }



    }]);