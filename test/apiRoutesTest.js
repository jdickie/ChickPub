var mocha = require('mocha'),
    expect = require('chai').expect,
    request = require('request'),
    config = require('config');

describe('/subscribe', function() {
    var url = config.environment.protocol + '://'
    + config.environment.host + ':'
    + config.environment.port,
        testTopic = '/topic/test';

    it('should return 200 with correct model (POST)', function (done) {
        request.post({
            url : url + '/api/subscribe',
            topic : testTopic
        }, function(err, message, res) {
            console.log(res);
            expect(res).to.be.json;
            expect(res.status).to.be(200);
            expect(res.errors).to.be.empty;
            done();
        });
    });

    it('should return 400 on bad data', function (done) {
        request.post({
            url : null,
            topic : null
        }, function(err, message, res) {
            expect(res).to.be.json;
            expect(res.status).to.be(400);
            expect(res.errors).to.be.empty;
            done();
        });
    });

    it('should return post', function (done) {
        request.put({
            url : url + '/api/subscribe',
            json : true,
            body : {
                "uid" : "123",
                "url" : "http://example.com/messageme"
            }
        }, function(err, message, res) {
            expect(res).to.have.string("subscribe - put");
            done();
        });
    });

    it('should return post', function (done) {
        request.get({
            url : url + '/api/subscribe'
        }, function(err, message, res) {
            expect(res).to.have.string("subscribe - all");
            done();
        });
    });
});