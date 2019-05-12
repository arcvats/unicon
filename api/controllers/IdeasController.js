var config = require("../../config");
var Ideas = require("../models/ideas");
var Student = require("../models/student");

Set.prototype.intersection = function(setB) {
  var intersection = new Set();
  for (var elem of setB) {
    if (this.has(elem)) {
      intersection.add(elem);
    }
  }
  return intersection;
};

function compareTags(a, b) {
  if (a.tags.length > b.tags.length) return -1;
  if (a.tags.length < b.tags.length) return 1;
  return 0;
}

module.exports = {
  save: function(req, res) {
    var student_id = req.decoded.id;
    Ideas.count({ student_id: student_id }, function(err, count) {
      if (count < 4) {
        Ideas.count({ title: req.body.title }, function(err, exist) {
          if (exist > 0) {
            res.send({ success: false, message: "Idea Present." });
          } else {
            var idea = new Ideas();
            idea.student_id = student_id;
            idea.title = req.body.title;
            idea.description = req.body.description;
            idea.tags = req.body.tags;
            idea.save();
            res.send({ success: true, message: "Idea created successfully." });
          }
        });
      } else {
        res.send({ success: false, message: "Ideas limit reached." });
      }
    });
  },
  all: function(req, res) {
    var student_id = req.decoded.id;
    Ideas.find({ student_id: student_id }, function(err, data) {
      if (err) {
        res.send({ success: false, message: "No ideas present." });
      } else {
        res.send({ success: true, data: data });
      }
    });
  },
  findCollaborators: function(req, res) {
    Ideas.findOne({ _id: req.body.id }, function(err, data) {
      if (err) {
        res.send({ success: false, message: "No Idea with that Id." });
      } else {
        var tags = new Set(data.tags);
        Student.find({ student_id: { $ne: req.decoded.id } }, function(
          error,
          students
        ) {
          if (error) {
            res.send({ success: false, message: "No students" });
          } else {
            var intersections = [];
            students.forEach(element => {
              if (
                tags.intersection(new Set(element.tags)).size > 0 &&
                !element.requested_collaboration.includes(req.body.id) &&
                !element.collaborating_on.includes(req.body.id)
              ) {
                intersections.push(element);
              }
            });
            intersections.sort(compareTags);
            if (intersections.length > 0)
              res.send({
                success: true,
                message: "Students found.",
                students: intersections
              });
            else
              res.send({
                success: false,
                message: "No collaborators with given tags."
              });
          }
        });
      }
    });
  },
  requestCollaboration: function(req, res) {
    var collaboratorId = req.body.id;
    var ideaId = req.body.ideaId;
    var requesterId = req.decoded.id;
    Student.findOne({ student_id: collaboratorId }, function(err, data) {
      if (err) {
        res.send({ success: false, message: "No student found." });
      } else {
        var requested_collaboration = data.requested_collaboration;
        requested_collaboration.push(ideaId);
        Student.updateOne(
          { student_id: collaboratorId },
          { requested_collaboration: requested_collaboration },
          function(err, data) {
            if (err) {
              res.send({
                success: false,
                message: "Unable to send collaboration request."
              });
            } else {
              res.send({
                success: true,
                message: "Collaborator request sent."
              });
            }
          }
        );
      }
    });
  }
};
