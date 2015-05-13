var express = require('express'),
    router = express.Router();


// Middleware
var postMiddleware = function(req, res, next) {
	var contentType = req.get('Content-Type'),
	clientToken = req.get('client_token');

};

router.post('/subscribe', function(req, res) {
    res.send('subscribe - post');
});

router.put('/subscribe', function(req, res) {
    res.send('subscribe - put');
});

router.all('/subscribe', function(req, res) {
    res.send('subscribe - all');
});

module.exports = router;