let express = require('express');
let router = express.Router();
let passport = require('./../src/auth/auth');
let User = require('./../src/models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/me', passport.authenticate('jwt'), function (req, res, next) {
  let callback = function (err, user) {
    if (err) {
      return res.status(500).json({err: err});
    }

    if (!user) {
      return res.status(404).json({user: 'Page not found'});
    }

    return res.status(200).json({user: user});
  };
  User.findById('5a9b2c21aa8b9700bbec8d7c', callback);
});

router.post('/register', function (req, res, next) {
  let data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    accounts: [{
      name: req.body.account_name,
      role: 'owner',
      enabled: true
    }]
  };

  let callback = function (err, user) {
    if (err) {
      return res.status(422).json({err: err});
    }
    return res.status(200).json({user: user});
  }

  User.create(data, callback);
});

module.exports = router;
