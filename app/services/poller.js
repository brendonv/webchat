angular.module('webchat')
    .factory('Poller', ["$interval", "MessageResource", "User", function($interval, MessageResource, User) {
        var intervalId, userId, lastCalled;
        return {
            poll: poll,
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
            var isInitialRequest = initial !== undefined ? initial : false;

            var timeOfCall = Date.now();

            MessageResource.index({userId: userId, lastCalled: lastCalled, initial: isInitialRequest}).$promise.then(function(data) {
                //set lastCalled to determine $gt time stamp
                lastCalled = timeOfCall;
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
