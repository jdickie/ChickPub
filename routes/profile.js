var express = require('express');
var router = express.Router();
var jade = require('jade');

router.get('/', function(req, res) {
    res.render('index', {title : "ChickPub"});
});

module.exports = router;