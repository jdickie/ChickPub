var express = require('express');
var router = express.Router();
var jade = require('jade');

var index = jade.compileFile('views/index.jade');

router.get('/subscribe', function(req, res) {

   res.render('subscribe', {
       title : 'Subscribe'
   });
});

router.get('/unsubscribe', function(req, res) {
   res.render('unsubscribe', {
       title : 'Unsubscribe'
   })
});

router.get('/publish', function(req, res) {
    index();
});

module.exports = router;