'use strict';

(function(){
    angular.module('unicon')
        .controller('AccountController',['$location','Auth',function($location,Auth){
            var self = this;
            self.isLogin = true;
            self.userResponse = {
                success:true,
                message:''
            };
            self.login = function(){
                Auth.login(self.user).then(function(response){
                    if(response.data.success){
                        if(response.data.token){
                            Auth.setToken(response.data.token);
                            self.userResponse.success = true;
                            self.user = {};
                            $location.path('/dashboard');
                        }else{
                            Auth.setToken();
                        }
                    }else{
                        self.userResponse.success = false;
                        self.userResponse.message = response.data.message;
                        self.user.password = '';
                    }
                });
            }
            self.register = function(){
                Auth.signup(self.user).then(function(response){
                    if(response.data.success){
                        if(response.data.token){
                            Auth.setToken(response.data.token);
                            self.userResponse.success = true;
                            self.user = {};
                            $location.path('/dashboard');
                        }else{
                            Auth.setToken();
                        }
                    }else{
                        self.userResponse.success = false;
                        self.userResponse.message = response.data.message;
                        self.user.password = '';
                        self.user.confPassword = '';
                    }
                });
            }
        }]);
})();