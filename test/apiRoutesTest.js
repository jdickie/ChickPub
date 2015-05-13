var mocha = require('mocha'),
    expect = require('chai').expect,
    request = require('request'),
    config = require('config');

describe('/subscribe', function() {
    var url = config.environment.protocol + '://'
    + config.environment.host + ':'
    + config.environment.port;

    it('should return post', function (done) {
        request.post({
            url : url + '/api/subscribe'
        }, function(err, message, res) {
            expect(res).to.have.string("subscribe - post");
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