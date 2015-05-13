var express = require('express'),
    router = express.Router(),
    chicksub = require('chicksub');


// Middleware
var postMiddleware = function(req, res, next) {
	var contentType = req.get('Content-Type'),
	clientToken = req.get('client_token');

};

var chickSub = new chicksub();

router.post('/subscribe', function(req, res) {
    try {
        console.log("Request: " + req);
        var status = 200,
            resBody = {
                errors : []
            },
            topic = req.body.topic,
            url = req.body.url;

        chickSub.subscribe(url, topic, function(err, results) {
            if (err) {
                status = 400;
                resBody.errors.push(err.message);
            }
            res.status(status).json(resBody);
        });

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