var express = require('express');
var authenticate = require('./middlewares/authenticate');
var UserController = require('./controllers/UserController');
var RideshareController = require('./controllers/RideshareController');
var StudentController = require('./controllers/StudentController');
var IdeasController = require('./controllers/IdeasController');
var CommunityController = require('./controllers/CommunityController');

module.exports = function(){
    var router = express.Router();
   
    router.post('/signup',UserController.register);
    router.post('/login',UserController.login);
    router.get('/seed',CommunityController.seed);
    router.post('/about',UserController.subscribe);
    router.use(authenticate);
    router.post('/me',UserController.me);
    router.get('/rideshare/all',RideshareController.all);
    router.post('/rideshare/create',RideshareController.create);
    router.post('/rideshare/book',RideshareController.book);
    router.get('/rideshare/offered_rides',RideshareController.getOfferedRides);
    router.get('/rideshare/booked_rides',RideshareController.getBookedRides);
    router.get('/student',StudentController.find);
    router.post('/student',StudentController.save);
    router.post('/idea',IdeasController.save);
    router.get('/idea',IdeasController.all);
    router.post('/collab',IdeasController.findCollaborators);
    router.post('/collab_req',IdeasController.requestCollaboration);
    router.get('/requests',StudentController.getPendingRequests);
    router.post('/requests',StudentController.approveRequest);
    router.get('/approved_requests',StudentController.getApprovedRequests);
    router.post('/reject_request',StudentController.rejectRequest);
    router.get('/communities',CommunityController.all);
    router.post('/meetup',CommunityController.createMeetup);
    router.get('/meetup',CommunityController.getAllMeetups);

    return router;
}