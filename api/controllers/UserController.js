var User = require("../models/user");
var jwt = require("../helpers/jwt");
var sgMail = require("@sendgrid/mail");
var securebox = require("securebox");

module.exports = {
  register: function(req, res) {
    var user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    if (
      req.body.email == null ||
      req.body.email == "" ||
      req.body.password == null ||
      req.body.password == ""
    ) {
      res.json({ success: false, messaree: "Values missing." });
    } else {
      user.save(function(err) {
        if (err) {
          res.json({ success: false, message: "Email already exists." });
        } else {
          var token = jwt.sign(user.email, user._id);
          res.json({
            success: true,
            message: "User Successfully created.",
            token: token
          });
        }
      });
    }
  },
  login: function(req, res) {
    securebox.stackTrace();
    securebox.startTimer();
    User.findOne({ email: req.body.email }).exec(function(err, user) {
      if (err) {
        throw err;
      } else {
        if (!user) {
          res.json({ success: false, message: "Failed to authenticate." });
        } else if (user && req.body.password) {
          var validPassword = user.comparePassword(req.body.password);
          if (!validPassword) {
            res.json({ success: false, message: "Password invalid." });
          } else {
            var token = jwt.sign(user.email, user._id);
            res.json({
              success: true,
              message: "Password valid.",
              token: token
            });
          }
        } else {
          res.json({ success: false, message: "Fields missing." });
        }
      }
    });
    securebox.endTimer();
  },
  me: function(req, res) {
    res.send(req.decoded);
  },
  subscribe: function(req, res) {
    var rec = req.body.email;
    console.log(rec);
    sgMail.setApiKey("SENDGRID APIKEY");
    var msg = {
      to: rec,
      from: "fromField",
      subject: "Welcome to Unicon",
      text:
        "Thank you for subscribing to unicon. Be the part of awesome team and expore the genius in you.",
      html:
        "<strong>Please find our business card at <br> <br> and our info deck at <br> </strong>"
    };
    sgMail.send(msg, function(result) {
      console.log(result);
    });
    res.send({ success: true, message: "Successfull" });
  }
};
