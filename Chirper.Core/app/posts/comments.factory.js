(function() {
    'use strict';

    angular
        .module('app')
        .factory('CommentsFactory', CommentsFactory);

    CommentsFactory.$inject = ['$http', '$q', '$log', 'apiUrl'];

    /* @ngInject */
    function CommentsFactory($http, $q, $log, apiUrl) {
        var service = {
            postComment: postComment,
            deleteComment: deleteComment
        };
        return service;

        ////////////////

        function postComment(post) {
            var defer = $q.defer();

            $http({
                method: 'POST',
                url: apiUrl + 'comments',
                data: post
            }).then(function(response) {
                defer.resolve(response);
            }, function(error) {
                defer.reject(error);
            });

            return defer.promise;

        }

        function deleteComment(serverId) {
            var defer = $q.defer();

            $http({
                method: 'DELETE',
                url: apiUrl + 'comments/' + serverId
            }).then(function(response) {
                defer.resolve(response);
            }, function(error) {
                defer.reject(error);
            });

            return defer.promise;

        }

    }
})();
