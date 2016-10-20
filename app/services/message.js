angular.module('webchat')
    .factory('MessageResource', ['$resource', 'API', function($resource, API) {
        var url = API + '/messages/:userId';
        var params = {
            userId: "@_id"
        };
        var methods = {
            index: {method: 'GET', url: url},
            create: {method: 'POST', url: url}
        };
        return $resource(url, params, methods);
    }]);