'use strict';

(function () {
    angular.module('unicon')
        .factory('Auth', ['$http', '$window', function($http, $window) {
            return {
                signup:function(credentials) {
                    return $http.post('/api/signup',credentials);
                },
    
                login:function(credentials) {
                    return $http.post('/api/login', credentials);
                },
    
                isLoggedIn:function() {
                    if(this.getToken()){
                        return true;
                    }else{
                        return false;
                    }
                },
    
                getUser:function(){
                    if(this.getToken()){
                        return $http.post('/api/me');
                    }else{
                        $q.reject({message:'User has no token.'});
                    }
                },
    
                logout:function(){
                    this.setToken();
                },
    
                getToken:function() {
                    return $window.localStorage.getItem('token');
                },
    
                setToken:function(token) {
                    if(token){
                        $window.localStorage.setItem('token', token);
                    }else{
                        $window.localStorage.removeItem('token');
                    }     
                }
            };       
        }])
        .factory('AuthInterceptor',['$injector',function($injector){
            return {
                request:function(config){
                    var token = $injector.get('Auth').getToken();
                    if(token){
                        config.headers['x-access-token'] = token;
                    }
                    return config;
                }
            };
        }])
        .factory('Rides',['$http',function($http){
            return {
                all:function(){
                    return $http.get('/api/rideshare/all');
                },
                create:function(data){
                    return $http.post('/api/rideshare/create',data);
                },
                book:function(data){
                    return $http.post('/api/rideshare/book',data);
                },
                getOfferedRides:function(){
                    return $http.get('/api/rideshare/offered_rides');
                },
                getBookedRides:function(){
                    return $http.get('/api/rideshare/booked_rides');
                }
            }
        }])
        .factory('Student',['$http',function($http){
            return {
                preFetch:function(){
                    return $http.get('/api/student');
                },
                save:function(data){
                    return $http.post('/api/student',data);
                },
                getPendingRequests:function(){
                    return $http.get('/api/requests');
                },
                approveRequest:function(data){
                    return $http.post('/api/requests',data);
                },
                getApprovedRequests:function(){
                    return $http.get('/api/approved_requests');
                },
                rejectRequest:function(data){
                    return $http.post('/api/reject_request',data);
                }
            }
        }])
        .factory('Ideas',['$http',function($http){
            return {
                save:function(data){
                    return $http.post('/api/idea',data);
                },
                all:function(data){
                    return $http.get('/api/idea');
                },
                findCollaborators:function(id){
                    return $http.post('/api/collab',{id:id});
                },
                requestCollaboration:function(id,ideaId){
                    return $http.post('/api/collab_req',{id:id,ideaId:ideaId});
                }
            }
        }])
        .factory('Community',['$http',function($http){
            return {
                all:function(){
                    return $http.get('/api/communities');
                },
                createMeetup:function(data){
                    return $http.post('/api/meetup',data);
                },
                getAllMeetups:function(){
                    return $http.get('/api/meetup');
                }
            }
        }]).factory('About',['$http',function($http){
            return {
                subscribe:function(data){
                    return $http.post('/api/about',data);
                }
            }
        }]);
})();