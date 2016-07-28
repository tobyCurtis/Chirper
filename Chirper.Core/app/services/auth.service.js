(function() {
    'use strict';

    angular
        .module('app')
        .factory('authService', authService);

    authService.$inject = ['$http', '$q', 'localStorageService', '$location', 'apiUrl'];

    /* @ngInject */
    function authService($http, $q, localStorageService, $location, apiUrl) {

        var storage;

        var state = {
            loggedIn: false
        };

        var service = {
            state: state,
            register: register,
            login: login,
            logout: logout,
            init: init,
            set: set,
            get: get
        };
        return service;

        ////////////////

        function set(item) {
            storage = item;
        }

        function get() {
            return storage;
        }

        function register(registration) {
            var defer = $q.defer();

            $http.post(apiUrl + 'accounts/register', registration)
                .then(
                    function(response) {
                        defer.resolve(response);
                    },
                    function(err) {
                        defer.reject(err);
                    });

            return defer.promise;
        }

        function login(username, password) {
            logout();

            var defer = $q.defer();

            var data = 'grant_type=password&username=' + username + '&password=' + password;

            $http.post(apiUrl + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .then(
                    function(response) {
                        localStorageService.set('authorizationData', response.data);
                        defer.resolve(response.data);
                    },
                    function(err) {
                        console.log(err);
                        defer.reject(err);
                    });

            state.loggedIn = true;

            return defer.promise;
        }

        function logout() {
            localStorageService.remove('authorizationData');

            state.loggedIn = false;

            $location.path('#/login');
        }

        function init() {
            var authData = localStorageService.get('authorizationData');

            if (authData) {
                state.loggedIn = true;

                $location.path('#/posts');
            }
        }

    }
})();
