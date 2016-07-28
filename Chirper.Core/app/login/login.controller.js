(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['authService', '$state', 'toastr'];

    /* @ngInject */
    function LoginController(authService, $state, toastr) {
        
        var vm = this;

        vm.login = function() {
            authService.login(vm.email, vm.password)
                .then(function(response) {
                        authService.set(vm.email);
                        $state.go('posts');
                    },
                    function(message) {
                        toastr.warning(message.data.error_description);
                    });

        };

    }
})();
