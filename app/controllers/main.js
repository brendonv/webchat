angular.module("webchat")
    .controller("MainCtrl", ["$scope", "$rootScope", "$sanitize", "User", "MessageResource", "Poller", function($scope, $rootScope, $sanitize, User, MessageResource, Poller) {
        var pollerId;

        $scope.user = User.user();
        $scope.input = {
            value: ""
        };
        $scope.messages = [];
        $scope.sentMessages = {};

        function startPoller() {
            pollerId = Poller.poll(5* 1000, function (data) {
                if (data.length) {
                    //Check sentMessages object keys
                    console.log(data);
                    if (Object.keys($scope.sentMessages).length) {
                        for (var key in $scope.sentMessages) {
                            for (var i = 0; i < data.length; i++) {
                                var createdDate = new Date(data[i].created);
                                if (key == createdDate.valueOf()) {
                                    console.log("DUPLICATE: ", key, data[i].content);
                                    //Remove message from sent
                                    delete $scope.sentMessages[createdDate.valueOf()];
                                    //Remove duplicate
                                    data.splice(i, 1);
                                }
                            }
                        }
                    }
                    $scope.messages = $scope.messages.concat(data);
                }
            });
        }

        $scope.sendMessage = function() {
            var userId = $scope.user && $scope.user._id;
            var time = Date.now();
            if (userId === undefined) return;
            $scope.sentMessages[time] = 1;
            console.log($scope.sentMessages);
            MessageResource.create({content: $sanitize($scope.input.value), _id: userId, created: time}).$promise.then(function(data) {
                $scope.input.value = "";
                var message = data.message;
                if (!message) return; //TODO: handle error
                message.creator = $scope.user;
                $scope.messages.push(message);
                // $scope.sentMessages[message._id] = 1;
                var date = new Date(message.created);
                console.log("MESSAGE CREATED AT: ", date.valueOf(), time);
            }).catch(function(error) {
                //TODO: Show error dialog
                console.log("ERROR: main.sendMessage", error);
            });
        };

        $scope.$watch("user", function(newValue, oldValue) {
            if (newValue && !pollerId) {
                startPoller();
            }
        });

        $rootScope.$on("SIGNEDUP", function() {
            $scope.user = User.user();
        });

        //INIT MESSAGES
        MessageResource.index().$promise.then(function(data) {
            var messages = data.messages;

            if (!messages.length) return;
            $scope.messages = $scope.messages.concat(messages);
        }).catch(function(error) {
            //TODO: HANDLE ERROR
            console.log("ERROR: main initialization", error);
        });

    }]);
