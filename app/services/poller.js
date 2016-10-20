angular.module('webchat')
    .factory('Poller', ["$interval", "MessageResource", "User", function($interval, MessageResource, User) {
        var intervalId, userId;
        return {
            poll: poll,
            cancel: cancel
        };
        
        function poll(time, callback){
            var user = User.user();
            userId = user && user._id || ""
            intervalId = $interval(getMessages, time, 0, false, callback);
            return intervalId;
        }

        function getMessages(callback) {
            MessageResource.index({userId: userId}).$promise.then(function(data) {
                console.log("Poller getMessages", data);
                var messages = data.messages;

                if (messages) callback(messages);
            }).catch(function(error) {
                console.log("Poller getMessages error", error);
            });
        }

        function cancel() {
            $interval.cancel(intervalId);
        }

            
    }]);
