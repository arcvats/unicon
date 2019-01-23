'use strict';

(function(){
    angular.module('unicon',['ngRoute'])
        .config(['$httpProvider',function($httpProvider){
            $httpProvider.interceptors.push('AuthInterceptor');
        }]);
})();