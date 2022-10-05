const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
checkDuplicateUsername = (req, res, next) => {
  const username = req.body.username
  console.log("username " + username)
  //const email = req.body.email
  //console.log("email: " + email)
  // Username
  User.findOne({
    where: {
      username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }
    // Email
    /*User.findOne({
      where: {
        email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }
      next();
    }); */

    next();
  });
};
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }

  next();
};
const verifySignUp = {
  checkDuplicateUsername: checkDuplicateUsername,
  checkRolesExisted: checkRolesExisted
};
module.exports = verifySignUp;