'use strict';

(function () {
    angular.module('unicon')
        .directive('login', [function () {
            return {
                templateUrl: '/views/login.html',
                restrict: 'E'
            };
        }])
        .directive('register', [function () {
            return {
                templateUrl: '/views/register.html',
                restrict: 'E'
            };
        }])
        .directive('paginate',[function(){
            return {
                templateUrl:'/views/paginate.html',
                restrict: 'E',
                scope:{
                    data:'='
                },
                controller:function(){
                    
                }
            }
        }])
})();