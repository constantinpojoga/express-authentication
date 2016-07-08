// LoginController
// ===============
// Controller for handling logins

var express         = require('express'),
    LoginController = express.Router(),
    bcrypt          = require('bcrypt'),
    User            = require(__dirname + '/../models/user');


LoginController.route('/?')
  // GET /
  // -----
  // Render the login page
  .get(function(req, res, next) {
    res.render('login', {
      // csrfToken: req.csrf()
    });
  })
  // POST /
  // ------
  // Log the user in
  .post(function(req, res, next) {
    User.findOne({username: req.body.username}, function(error, user) {
      if (error || !user) {
        res.send('Could not find user');
      } else {
        bcrypt.compare(req.body.password, user.password, function(err, result) {
          if (err) {
            res.send('ERROR: ' + err);
          } else if (result) {
            res.redirect('/usersonly');
          } else {
            res.send('Wrong password!')
          }
        })
      }
    })
  })

module.exports = LoginController;
