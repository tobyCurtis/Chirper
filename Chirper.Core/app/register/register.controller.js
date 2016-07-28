(function() {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['authService', '$state', 'toastr'];

    /* @ngInject */
    function RegisterController(authService, $state, toastr) {
        var vm = this;

        vm.register = function() {
            authService.register(vm.registration)
                .then(function(response) {
                        toastr.success("Registration succeeded!");
                        $state.go('login');
                    },
                    function(error) {
                        console.log(error);
                        toastr.error(error.data.Message);
                    }
                );
        };


    }
})();
