'use strict';
(function () {
    angular.module('unicon')
        .controller('DashboardController', ['Student', function (Student) {
            var self = this;
            self.isEditable = false;
            self.college = 'Conestoga';
            self.profile = {};
            self.tags = new Set();
            self.tagNames = {
                'java': 'java',
                'ux': 'ux',
                'python': 'python',
                'nodejs': 'nodejs',
                'algorithms': 'algorithms'
            };
            self.pendingRequests = [];
            self.collaboratingOn = [];

            self.tagSelected = function () {
                self.tags.add(self.tag);
                self.profile.tags = [...self.tags];
            }

            self.deleteTag = function (tagName) {
                self.tags.delete(tagName);
                self.profile.tags = [...self.tags];
            }

            Student.preFetch().then(function (data) {
                if (data.data.student == null) {
                    self.profile = {};
                } else {
                    self.profile = data.data.student;
                    for (var i = 0; i < self.profile.tags.length; i++) {
                        self.tags.add(self.profile.tags[i]);
                    }
                }
            });
            self.toggleIsEditable = function () {
                self.isEditable = !self.isEditable;
            };

            self.saveProfile = function () {
                self.toggleIsEditable();
                Student.save(self.profile).then(function (data) {
                    self.profile = data.data.student;
                    for (var i = 0; i < self.profile.tags.length; i++) {
                        self.tags.add(self.profile.tags[i]);
                    }
                });
            }

            self.getPendingRequests = function () {
                Student.getPendingRequests().then(function (res) {
                    if (res.data.success) {
                        self.pendingRequests = res.data.pendingRequests;
                    } else {
                        self.pendingRequests = [];
                    }
                });
            }
            self.getApprovedRequests = function(){
                Student.getApprovedRequests().then(function (res) {
                    if (res.data.success) {
                        self.collaboratingOn = res.data.approvedRequests;
                    } else {
                        self.collaboratingOn = [];
                    }
                });
            }
            self.getPendingRequests();
            self.getApprovedRequests();

            self.approveRequest = function (ideaId) {
                Student.approveRequest({ ideaId: ideaId }).then(function (res) {
                    if (res.data.success) {
                        self.collaboratingOn = res.data.collaboratingOn;
                        self.getPendingRequests();
                        self.getApprovedRequests();
                    } else {
                        self.collaboratingOn = [];
                    }
                });
            }

            self.rejectRequest = function(ideaId){
                Student.rejectRequest({ideaId:ideaId}).then(function(res){
                    if(res.data.success){
                        self.getApprovedRequests();
                        self.getPendingRequests();
                    }else{
                        self.getApprovedRequests();
                        self.getPendingRequests();
                    }
                });
            }

        }]);
})();