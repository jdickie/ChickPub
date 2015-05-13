var express = require('express');
var router = express.Router();
var jade = require('jade');

var index = jade.compileFile('views/index.jade');

router.get('/subscribe', function(req, res) {
    /** @TODO: Documentation goes here **/
    index();
});

router.get('/publish', function(req, res) {
    index();
});

module.exports = router;