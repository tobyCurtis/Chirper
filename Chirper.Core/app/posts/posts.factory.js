(function() {
    'use strict';

    angular
        .module('app')
        .factory('PostsFactory', PostsFactory);

    PostsFactory.$inject = ['$http', '$q', '$log', 'apiUrl', 'authService'];

    /* @ngInject */
    function PostsFactory($http, $q, $log, apiUrl, authService) {
        var service = {
            getPosts: getPosts,
            postPost: postPost,
            deletePost: deletePost,
            putPost: putPost
        };
        return service;



        function getPosts() {

            var defer = $q.defer();

            $http({
                method: 'GET',
                url: apiUrl + 'posts'
            }).then(
                function(response) {
                    defer.resolve(response);
                },
                function(error) {
                    defer.reject(error);
                });

            return defer.promise;
        }

        function postPost(postBody) {
            var data = {};
            data.Text = postBody;
            var defer = $q.defer();

            $http({
                method: 'POST',
                url: apiUrl + 'posts',
                data: data
            }).then(function(response) {
                    defer.resolve(response);
                },
                function(error) {
                    defer.reject(error);
                });

            return defer.promise;
        }

        function deletePost(post) {
            var defer = $q.defer();

            $http({
                method: 'DELETE',
                url: apiUrl + 'posts/' + post.serverId
            }).then(function(response) {
                    console.log(response);
                },
                function(error) {
                    console.log(error);
                });

            return defer.promise;

        }

        function putPost(post) {

            var defer = $q.defer();

            $http({
                method: 'PUT',
                url: apiUrl + 'posts/' + post.PostId,
                data: post
            }).then(function(response) {
                    console.log(response);
                },
                function(error) {
                    console.log(error);
                });

            return defer.promise;
        }

    }
})();
