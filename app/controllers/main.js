angular.module("webchat")
    .controller("MainCtrl", ["$scope", "$rootScope", "User", "MessageResource", "Poller", function($scope, $rootScope, User, MessageResource, Poller) {

        console.log("MAIN PAGER");

        var pollerId;

        $scope.user = User.user();
        $scope.input = {
            value: ""
        };
        $scope.messages = [];
        $scope.sentMessages = {};

        function startPoller() {
            pollerId = Poller.poll(10* 1000, function (data) {
                if (data.length) {
                    //Check sentMessages object keys
                    if (Object.keys($scope.sentMessages).length) {
                        console.log("SENT MESSAGES");
                        for (var i = 0; i < data.length; i++) {
                            if ($scope.sentMessages.hasOwnProperty(data[i]._id)) {
                                console.log("DUPLICATE");
                                //Remove message from sent
                                delete $scope.sentMessages[data[i]._id];
                                //Remove duplicate
                                data.splice(i, 1);
                            }
                        }
                    }
                    $scope.messages = $scope.messages.concat(data);
                }
            });
        }

        $scope.userInput = function() {
            console.log($scope.input.value);
        };

        $scope.sendMessage = function() {
            console.log("SEND: ", $scope.input.value)
            var userId = $scope.user && $scope.user._id;
            var time = Date.now();
            if (userId === undefined) return;
            
            MessageResource.create({content:$scope.input.value, _id: userId, created: time}).$promise.then(function(data) {
                $scope.input.value = "";
                var message = data.message;
                if (!message) return; //TODO: handle error
                message.creator = $scope.user;
                $scope.messages.push(message);
                $scope.sentMessages[message._id] = 1;
                console.log("MESSAGE CREATED AT: ", message.created);
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
