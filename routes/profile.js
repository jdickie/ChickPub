var express = require('express');
var router = express.Router();
var jade = require('jade');

router.get(/\/^((?!(api|docs)).)*$/, function(req, res) {
    res.redirect();
});

module.exports = router;