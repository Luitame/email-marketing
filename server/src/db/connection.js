let mongoose = require('mongoose');

mongoose.connect('mongodb://mongodb:27017/email_marketing', {});

module.exports = mongoose;
