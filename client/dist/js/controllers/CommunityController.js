'use strict';
(function () {
    angular.module('unicon')
        .controller('CommunityController', ['Community', function (Community) {
            var self = this;
            self.meetup = {};
            self.meetups = [];
            self.communities = [];
            self.topCommunities = [];
            self.isActiveMeetup = false;
            self.tag = '';
            
            self.today = (new Date()).toISOString();
            self.meetup.time = new Date("2018-05-05T12:00Z");

            self.comparator = function (a, b) {
                if (a.members.length > b.members.length)
                    return -1;
                if (a.members.length < b.members.length)
                    return 1;
                return 0;
            }

            self.getAllCommunities = function () {
                Community.all().then(function (res) {
                    if (res.data.success) {
                        self.communities = res.data.communities;
                        self.topCommunities = res.data.communities;
                        self.topCommunities.sort(self.comparator);
                    } else {
                        self.communities = [];
                        self.topCommunities = [];
                    }
                });
            }
            self.getAllCommunities();

            self.toggleModal = function(tag){
                if(tag)
                    self.tag = tag
                self.isActiveMeetup = !self.isActiveMeetup;
            }

            self.getAllMeetups = function(){
                Community.getAllMeetups().then(function(res){
                    if(res.data.success){
                        self.meetups = [];
                        var meets = new Set();
                        res.data.allMeetups.forEach(element => {
                            if(element.meetups.length>0){
                                element.meetups.forEach(ele => {
                                    meets.add(ele);
                                });
                            }
                        });
                        
                        self.meetups = [...meets];
                    }else{
                        self.meetups = [];
                    }
                });
            }
            self.getAllMeetups();
            self.createMeetup = function(){
                Community.createMeetup({meetup:self.meetup,tag:self.tag}).then(function(res){
                    if(res.data.success){
                        self.getAllMeetups();
                    }else{
                        self.getAllMeetups();
                    }
                });
                self.toggleModal();
            }
        }]);
})();