angular.module("webchat")
    .controller("MainCtrl", ["$scope", "$rootScope", "User", "MessageResource", "Poller", function($scope, $rootScope, User, MessageResource, Poller) {

        console.log("MAIN PAGER");

        var pollerId;

        $scope.user = User.user();

        $scope.input = {
            value: ""
        };

        $scope.messages = [
        ];

        function startPoller() {
            pollerId = Poller.poll(10* 1000, function (data) {
                if (data.length) {
                    $scope.messages = $scope.messages.concat(data);
                    console.log("SET lastReceivedMessage", data[data.length -1].created);
                    Poller.lastReceivedMessage(data[data.length -1].created);
                }
            });
        }

        $scope.userInput = function() {
            console.log($scope.input.value);
        };

        $scope.sendMessage = function() {
            console.log("SEND: ", $scope.input.value)
            var userId = $scope.user && $scope.user._id;
            if (userId === undefined) return;
            MessageResource.create({content:$scope.input.value, _id: userId}).$promise.then(function(data) {
                console.log("MESSAGE CREATE: ", data);
                $scope.input.value = "";
            }).catch(function(error) {
                //TODO: Show error dialog
                console.log("ERROR: main.sendMessage", error);
            });
        };

        $scope.$watch("user", function(newValue, oldValue) {
            console.log("user value change", newValue, oldValue);
            if (newValue && !pollerId) {
                startPoller();
            }
        });

        $rootScope.$on("SIGNEDUP", function() {
            $scope.user = User.user();
        });

    }]);
