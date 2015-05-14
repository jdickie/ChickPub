var mocha = require('mocha'),
    expect = require('chai').expect,
    request = require('request'),
    config = require('config');
var url = config.environment.protocol + '://'
        + config.environment.host + ':'
        + config.environment.port;

describe('/subscribe', function() {
    var testUrl = 'http://messageme.com',
        testTopic = '/topic/test',
        testModel;

    it('should return 200 with correct model (POST)', function (done) {
        request.post({
            url : url + '/api/subscribe',
            json : true,
            body : {
                url : testUrl,
                topic : testTopic
            }
        }, function(err, message, res) {
            expect(res).to.be.json;
            expect(res.errors).to.be.empty;
            expect(res.result).to.be.json;
            testModel = res.result;
            done();
        });
    });

    it('should return 400 on bad data', function (done) {
        request.post({
            url : url + '/api/subscribe',
            json : true,
            body : {
                topic : null,
                url : null
            }
        }, function(err, message, res) {
            expect(res).to.be.json;
            expect(res.errors.length).to.be.greaterThan(0);
            done();
        });
    });

    it('should update existing subscription', function (done) {
        var otherTopic = '/topic/other';
        request.put({
            url : url + '/api/subscribe',
            json : true,
            body : {
                uid : testModel.uid,
                topic : otherTopic
            }
        }, function(err, message, res) {
            expect(res.result).to.exist;
            expect(res.result.topic).to.equal(otherTopic);
            done();
        });
    });

    it('all outher routes go to docs', function (done) {
        request.get({
            url : url + '/api/subscribe'
        }, function(err, message, res) {
            expect(res).to.have.string("<!DOCTYPE");
            done();
        });
    });
});
describe('/unsubscribe', function () {
    var testUrl = 'http://messageme.com',
        testTopic = '/topic/test',
        testModel;

    before(function (done) {
        request.post({
            url : url + '/api/subscribe',
            json : true,
            body : {
                url : testUrl,
                topic : testTopic
            }
        }, function (err, message, res) {
            expect(res).to.be.json;
            expect(res.errors).to.be.empty;
            expect(res.result).to.be.json;
            testModel = res.result;
            done();
        });
    });
    it('should remove a subscribed user', function (done) {
        request.post({
            url : url + '/api/unsubscribe',
            json : true,
            body : {
                uid : testModel.uid
            }
        }, function (err, message, res) {
            expect(res).to.be.json;
            if (res.errors.length) {
                console.log(res.errors[0]);
            }
            expect(res.errors).to.be.empty;
            expect(res.result).to.be.json;
            done();
        });
    });
    it('should pass back a db error when removing already removed user', function (done) {
        request.post({
            url : url + '/api/unsubscribe',
            json : true,
            body : {
                uid : testModel.uid
            }
        }, function (err, message, res) {
            expect(res).to.be.json;
            expect(res.errors.length).to.be.greaterThan(0);
            done();
        });
    });
});
describe('/publish/:format/:name', function () {
    var testUrl = 'http://messageme.com',
        testTopic = '/topic/test',
        testModel;

    before(function (done) {
        request.post({
            url : url + '/api/subscribe',
            json : true,
            body : {
                url : testUrl,
                topic : testTopic
            }
        }, function (err, message, res) {
            expect(res).to.be.json;
            expect(res.errors).to.be.empty;
            expect(res.result).to.be.json;
            testModel = res.result;
            done();
        });
    });

    it('should send a topic to recipients', function (done) {
        request.post({
            url : url + '/api/publish' + testTopic,
            json : true,
            body : {
                title : "Hello World",
                body : "I got something to say..."
            }
        }, function (err, message, res) {
            expect(res).to.be.json;
            expect(res.errors).to.be.empty;
            expect(res.failed).to.be.equal(0);
            expect(res.success).to.be.greaterThan(0);
            done();
        });
    });

    it('should return all subscriptions', function(done) {
        request.get({
            url : url + '/api/publish' + testTopic,
            json : true
        }, function (err, message, res) {
            expect(res).to.be.json;
            expect(res.errors).to.be.empty;
            expect(res['subscribers'].length).to.be.greaterThan(0);
            done();
        });
    });
});