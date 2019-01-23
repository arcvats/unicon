'use strict';
(function(){
    angular.module('unicon')
        .controller('HomeController',[function(){
            var self = this;
            self.logout = function(){
                $window.localStorage.removeItem('token');
            }
        }]);
})();