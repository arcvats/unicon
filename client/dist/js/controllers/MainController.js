'use strict';
(function(){
    angular.module('unicon')
        .controller('MainController',['Auth','$rootScope',function(Auth,$rootScope){
            var self = this;
            self.mobileActivated = false;
            $rootScope.$on('$routeChangeStart',function(){
                if(Auth.isLoggedIn()){
                    self.isLoggedIn = true;
                    Auth.getUser().then(function(response){
                        self.email = response.data.email;
                        if(response.data.expired){
                            self.logout();
                        }
                    });
                }else{
                    self.isLoggedIn = false;
                    self.email = '';
                }
            });
            
            self.logout = function(){
                Auth.logout();
            }

            self.toggleNav = function(){
                self.mobileActivated = !self.mobileActivated;
            }
            
        }]);
})();