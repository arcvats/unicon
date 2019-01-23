'use strict';
(function(){
    angular.module('unicon')
        .controller('AboutController',['About',function(About){
            var self = this;
            self.email = '';
            self.success = false;
            self.subscribe = function(){
                About.subscribe({email:self.email}).then(function(res){
                    if(res.data.success){
                        self.success = true;
                    }else{
                        self.success = false;
                    }
                });
            }
            
        }]);
})();