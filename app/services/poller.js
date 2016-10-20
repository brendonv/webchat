angular.module('webchat')
    .factory('Poller', ["$interval", "MessageResource", "User", function($interval, MessageResource, User) {
        var intervalId, userId, lastReceivedMessage;
        return {
            poll: poll,
            lastReceivedMessage: setLastReceivedMessage,
            cancel: cancel
        };
        
        function poll(time, callback){
            var user = User.user();
            userId = user && user._id || "";
            getMessages(callback, true);
            intervalId = $interval(getMessages, time, 0, false, callback);
            return intervalId;
        }

        function getMessages(callback, initial) {
            console.log("getMessages: ", lastReceivedMessage);
            var isInitialRequest = initial !== undefined ? initial : false;
            MessageResource.index({userId: userId, lastReceivedMessage: lastReceivedMessage, initial: isInitialRequest}).$promise.then(function(data) {
                console.log("Poller getMessages", data);
                var messages = data.messages;

                if (messages) callback(messages);
            }).catch(function(error) {
                console.log("Poller getMessages error", error);
            });
        }

        function setLastReceivedMessage(value) {
            lastReceivedMessage = value;
        }

        function cancel() {
            $interval.cancel(intervalId);
        }

            
    }]);
