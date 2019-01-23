'use strict';

(function(){
    angular.module('unicon')
        .config(['$locationProvider','$routeProvider',function($locationProvider,$routeProvider){
            $locationProvider.html5Mode(true);
            $routeProvider.when('/',{
                templateUrl:'/views/home.html',
                controller:'HomeController',
                controllerAs:'HomeCtrl',
                authenticated:false
            });
            $routeProvider.when('/about',{
                templateUrl:'/views/about.html',
                controller:'AboutController',
                controllerAs:'AboutCtrl',
                authenticated:false
            });
            $routeProvider.when('/account',{
                templateUrl:'/views/account.html',
                controller:'AccountController',
                controllerAs:'AccountCtrl',
                authenticated:false
            });
            $routeProvider.when('/rideshare',{
                templateUrl:'/views/rideshare.html',
                controller:'RideshareController',
                controllerAs:'RideshareCtrl',
                authenticated:true
            });

            $routeProvider.when('/dashboard',{
                templateUrl:'/views/dashboard.html',
                controller:'DashboardController',
                controllerAs:'DashboardCtrl',
                authenticated:true
            });

            $routeProvider.when('/ideas',{
                templateUrl:'/views/ideas.html',
                controller:'IdeasController',
                controllerAs:'IdeasCtrl',
                authenticated:true
            });

            $routeProvider.when('/resources',{
                templateUrl:'/views/resources.html',
                controller:'ResourcesController',
                controllerAs:'ResourcesCtrl',
                authenticated:true
            });

            $routeProvider.when('/communities',{
                templateUrl:'/views/communities.html',
                controller:'CommunityController',
                controllerAs:'CommunityCtrl',
                authenticated:true
            });

            $routeProvider.otherwise({redirectTo:'/'});
        }])
        .run(['$rootScope','Auth','$location',function($rootScope,Auth,$location){
            $rootScope.$on('$routeChangeStart',function(event,next,current){
                if(next.$$route.authenticated==true){
                    if(!Auth.isLoggedIn()){
                        event.preventDefault();
                        $location.path('/account');
                    }
                }else if(next.$$route.authenticated==false){
                    if(Auth.isLoggedIn()){
                        event.preventDefault();
                        $location.path('/dashboard');
                    }
                }else{
                    $location.path('/');
                }
            });
        }]);
})();

