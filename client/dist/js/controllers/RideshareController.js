'use strict';

(function(){
    angular.module('unicon')
        .controller('RideshareController',['Rides','Auth',function(Rides,Auth){
            var self = this;
            self.allRides = [];
            self.destination = '';
            self.departure = '';
            self.time = '';
            self.passengers = '';
            self.userId = '';
            self.createActive = false;
            self.search = '';
            self.bookedRides = [];
            self.offeredRides = [];

            self.toggleRideModal = function(){
                self.createActive = !self.createActive;
            }

            Auth.getUser().then(function(response){
                self.userId = response.data.email;
                if(response.data.expired){
                    self.logout();
                }
            });
            self.createRide = function(){
                Rides.create(
                    {
                        "destination":self.destination,
                        "departure":self.departure,
                        "time":self.time,
                        "passengers":parseInt(self.passengers),
                        "userId":self.userId
                    }
                ).then(function(response){
                    self.toggleRideModal();
                    self.getAllRides();
                    self.getOfferedRides();
                    self.getBookedRides();
                });
            }

            self.getAllRides = function(){
                Rides.all().then(function(response){
                    self.allRides = response.data;
                });
            }

            self.getOfferedRides = function(){
                Rides.getOfferedRides().then(function(response){
                    console.log(response);
                    self.offeredRides = response.data;
                });
            }
            self.getOfferedRides();

            self.getBookedRides = function(){
                Rides.getBookedRides().then(function(response){
                    console.log(response);
                    self.bookedRides = response.data;
                });
            }
            self.getBookedRides();

            self.bookRide = function(rideId){
                Rides.book({id:rideId,userId:self.userId}).then(function(response){
                    self.getAllRides();
                    self.getOfferedRides();
                    self.getBookedRides();
                });
            }

            self.getAllRides();
        }]);
})();