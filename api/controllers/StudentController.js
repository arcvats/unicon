var config = require('../../config');
var Student = require('../models/student');
var Ideas = require('../models/ideas');
var Community = require('../models/community');

module.exports = {
    find: function (req, res) {
        var student_id = req.decoded.id;
        Student.findOne({ student_id: student_id }).exec(function (err, data) {
            if (err) {
                throw err;
            } else {
                if (!data) {
                    res.send({ student: null });
                } else {
                    res.send({ student: data });
                }
            }
        });
    },
    save: function (req, res) {
        var student_id = req.decoded.id;
        Student.findOne({ student_id: student_id }).exec(function (err, data) {
            if (err) {
                throw err;
            } else {
                if (!data) {
                    var student = new Student();
                    student.student_id = student_id;
                    student.name = req.body.name;
                    student.department = req.body.department;
                    student.college = 'Conestoga';
                    student.course = req.body.course;
                    student.tags = req.body.tags;
                    student.save(function (err) {
                        if (err) {
                            res.send({ success: false, message: "student not created" });
                        } else {
                            Community.updateMany({ name: { $in: req.body.tags } },
                                {
                                    $push: {
                                        members: {
                                            id:student_id,
                                            name:req.body.name,
                                            department:req.body.department,
                                            course:req.body.course   
                                        }
                                    }
                                }, { safe: true, upsert: true, new: true }, function (err, response) {
                                    if (err) {
                                        res.send({ success: false, message: 'Community not updated.' });
                                    } else {
                                        res.send({ student: student });
                                    }
                                });
                        }
                    });
                } else {
                    var data = {};
                    data.name = req.body.name;
                    data.department = req.body.department;
                    data.course = req.body.course;
                    data.tags = req.body.tags;
                    Student.update({ student_id: student_id }, data, function (err, response) {
                        if (err) {
                            throw err;
                        }
                        Student.findOne({ student_id: student_id }).exec(function (err, data) {
                            if (err) {
                                throw err;
                            } else {
                                if (!data) {
                                    res.send({ student: null });
                                } else {
                                    res.send({ student: data });
                                }
                            }
                        });
                    });
                }
            }
        });

    },
    getPendingRequests: function (req, res) {
        Student.findOne({ student_id: req.decoded.id }, function (err, data) {
            if (err) {
                res.send({ success: false, message: 'Self Not found' });
            } else {
                if (data) {
                    if (data.requested_collaboration.length > 0) {
                        var pendingRequests = [];

                        Ideas.find({ _id: { $in: data.requested_collaboration } }, function (error, ideas) {
                            if (error) {
                                res.send({ success: false, message: 'No requests' });
                            } else {
                                res.send({ success: true, message: 'Requests found.', pendingRequests: ideas });
                            }
                        });
                    }else{
                        res.send({ success: false, message: 'Self Not found' });
                    }
                } else {
                    res.send({ success: false, message: 'Self Not found' });
                }

            }
        });
    },
    getApprovedRequests: function (req, res) {
        Student.findOne({ student_id: req.decoded.id }, function (err, data) {
            if (err) {
                res.send({ success: false, message: 'Self Not found' });
            } else {
                if (data) {
                    if (data.collaborating_on.length > 0) {
                        var pendingRequests = [];

                        Ideas.find({ _id: { $in: data.collaborating_on } }, function (error, ideas) {
                            if (error) {
                                res.send({ success: false, message: 'No requests' });
                            } else {
                                res.send({ success: true, message: 'Requests found.', approvedRequests: ideas });
                            }
                        });
                    }else{
                        res.send({ success: false, message: 'Self Not found' });
                    }
                } else {
                    res.send({ success: false, message: 'Self Not found' });
                }

            }
        });
    },
    approveRequest: function (req, res) {
        var ideaId = req.body.ideaId.toString();
        Student.findOne({ student_id: req.decoded.id }, function (err, data) {
            if (err) {
                res.send({ success: false, message: 'No student with that Id.' });
            } else {
                var fullname = data.name;
                var pendingRequests = data.requested_collaboration;
                var collaboratingOn = data.collaborating_on;
                pendingRequests.splice(pendingRequests.indexOf(ideaId), 1);
                collaboratingOn.push(ideaId);
                Student.updateOne({ student_id: req.decoded.id }, { requested_collaboration: pendingRequests, collaborating_on: collaboratingOn }, function (err, success) {
                    if (err) {
                        res.send({ success: false, message: 'Not approved.' });
                    } else {
                        Ideas.findOne({ _id: ideaId }, function (err, idea) {
                            if (err) {
                                res.send({ success: false, message: 'Idea not found.' });
                            } else {
                                var collaborators = idea.collaborators;
                                collaborators.push(fullname);
                                Ideas.update({ _id: ideaId }, { collaborators: collaborators }, function (err, result) {
                                    if (err) {
                                        res.send({ success: false, message: 'Idea collaborators not updated.' });
                                    } else {
                                        res.send({ success: true, message: 'Update successful.', collaboratingOn: collaboratingOn });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    rejectRequest: function (req, res) {
        var ideaId = req.body.ideaId.toString();
        Student.findOne({ student_id: req.decoded.id }, function (err, data) {
            if (err) {
                res.send({ success: false, message: 'No student with that Id.' });
            } else {
                var pendingRequests = data.requested_collaboration;
                pendingRequests.splice(pendingRequests.indexOf(ideaId), 1);
                Student.updateOne({ student_id: req.decoded.id }, { requested_collaboration: pendingRequests }, function (err, data) {
                    if (err) {
                        res.send({ success: false, message: 'Failed to update.' });
                    } else {
                        res.send({ success: true, message: 'Rejected request.' });
                    }
                });
            }
        });
    }

}