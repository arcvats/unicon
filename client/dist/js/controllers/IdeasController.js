'use strict';
(function(){
    angular.module('unicon')
        .controller('IdeasController',['Auth','Ideas',function(Auth,Ideas){
            var self = this;
            self.modalShow = false;
            self.idea = {};
            self.ideaId = '';
            self.allIdeas = [];
            self.collaborators = [];
            self.message = '';
            self.tags = new Set();
            self.tagNames = {
                'java':'java',
                'ux':'ux',
                'python':'python',
                'nodejs':'nodejs',
                'algorithms':'algorithms'
            };

            self.tagSelected = function(){
                self.tags.add(self.tag);
                self.idea.tags = [...self.tags];
            }

            self.deleteTag = function(tagName){
                self.tags.delete(tagName);
                self.idea.tags = [...self.tags];
            }

            self.toggleModal = function(){
                self.modalShow = !self.modalShow;
            }

            self.all = function(){
                Ideas.all().then(function(res){
                    if(res.data.success)
                        self.allIdeas = res.data.data;
                    else
                        self.allIdeas = [];
                });
            };
            self.all();

            self.save = function(){
                Ideas.save(self.idea).then(function(res){
                    if(res.data.success){
                        self.idea = {};
                        self.all();
                    }else{
                        self.idea = {};
                        self.message = res.data.message; 
                    }
                });
            }

            self.findCollaborators = function(id){
                self.ideaId = id;
                Ideas.findCollaborators(id).then(function(res){
                    if(res.data.success){
                        self.toggleModal();
                        self.collaborators = res.data.students;
                        
                    }else{
                        self.message = res.data.message;
                    }
                });
            }

            self.requestCollaboration = function(id){
                Ideas.requestCollaboration(id,self.ideaId).then(function(res){
                    if(res.data.success){
                        self.findCollaborators(self.ideaId);
                        self.toggleModal();
                    }else{
                        self.message = res.data.message;
                    }
                });
            }  
        }]);
})();