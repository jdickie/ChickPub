var express = require('express'),
    router = express.Router(),
    chicksub = require('chicksub'),
    chickpub = require('chickpub'),
    _ = require('underscore'),
    jade = require('jade');


// Middleware
var postMiddleware = function(req, res, next) {
	var contentType = req.get('Content-Type'),
	clientToken = req.get('client_token');

};

var chickSub = new chicksub(),
    chickPub = new chickpub();

router.post('/subscribe', function(req, res) {
    try {
        var status = 200,
            resBody = {
                errors : []
            },
            topic = req.body.topic,
            url = req.body.url;

        chickSub.subscribe(url, topic, function(err, model) {
            if (err) {
                status = 400;
                resBody.errors.push(err.message);
            } else {
                resBody.result = model;
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
        var uid = req.body.uid,
            topic = req.body.topic,
            url = req.body.url,
            props = {};
        if(!_.isEmpty(topic)) {
            props.topic = topic;
        }
        if(!_.isEmpty(url)) {
            props.url = url;
        }

        chickSub.updateSubscription(uid, props, function(err, model) {
            var resBody = { errors : [] },
                status = 200;
            if (err) {
                resBody.errors.push(err.message);
                console.log(err);
                status = 400;
                console.log('bad data' + resBody);
            } else {
                resBody.result = model;
                console.log('result: ' + resBody);
            }
            res.status(status).json(resBody);
        });
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

router.all('/subscribe', function(req, res) {
    try {
        res.redirect('/docs/subscribe');
    } catch (e) {
        console.log("Compile error", e);
        res.status(500).send();
    }
});

router.post('/unsubscribe', function(req, res) {
    try {
        chickSub.unsubscribe(function(err, model) {
            var resBody = { errors : [] },
                status = 200;
            if (!_.isEmpty(err)) {
                resBody.errors.push(err.message);
                status = 400;
                console.log('bad data ' + resBody);
            } else {
                resBody.result = model;
                console.log('result: ' + resBody);
            }
            res.status(status).json(resBody);
        });
    } catch (e) {
        res.status(500).json({
            errors : [ e ]
        });
    }
});

router.all('/unsubscribe', function(req, res) {
    try {
        res.redirect('/docs/unsubscribe');
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

router.post('/publish/:format/:name', function(req, res) {
    try {
        var format = req.params.format,
            endpoint = req.params.name,
            topic = '/' + format + '/' + endpoint,
            title = req.body.title,
            body = req.body.body,
            resBody = {
                errors : [],
                success : 0,
                failed : 0
            },
            status = 200;
            chickPub.sendMessageToTopic({ title : title, body : body }, topic, function(err, results) {
                if(err) {
                    status = 400;
                    resBody.errors.push(err.message);
                }
                resBody = _.extend(resBody, results);
                res.status(status).json(resBody);
            });

    } catch (e) {
        res.status(500).send();
    }
});


router.get('/publish/:format/:name', function(req, res) {
    try {
        var format = req.params.format,
            name = req.params.name,
            topic = '/' + format + '/' + name,
            resBody = {
                errors : [],
                subscribers : []
            },
            status = 200;
        chickPub.getAllSubscribers(topic, function(err, jsonBody) {
            if (err) {
                status = 400;
                resBody.errors.push(err);
            }

            resBody = _.extend(resBody, jsonBody);
            res.status(status).json(resBody);
        });
    } catch (e) {
        res.status(500).json({
            errors : [e.message]
        });
    }
});

router.all('/publish', function(req, res) {
    try {
        res.redirect('/docs/publish');
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

module.exports = router;