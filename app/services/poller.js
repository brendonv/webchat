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
            intervalId = $interval(getMesages, time);
        }

        function getMesages() {
            MessageResource.index({userId: userId}).$promise.then(function(data) {
                
            }).catch(function(error) {

            });
        }

        function cancel() {
            $interval.cancel(intervalId);
        }

            
    }]);
