var express = require('express'),
    router = express.Router();


// Middleware
var postMiddleware = function(req, res, next) {
	var contentType = req.get('Content-Type'),
	clientToken = req.get('client_token');

};

router.post('/subscribe', function(req, res) {
    try {
        res.send('subscribe - post');
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

router.put('/subscribe', function(req, res) {
    try {
        res.send('subscribe - put');
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

router.all('/subscribe', function(req, res) {
    try {
        res.send('subscribe - all');
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

module.exports = router;