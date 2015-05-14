var mocha = require('mocha'),
    expect = require('chai').expect,
    mockery = require('mockery');

var testUrl = 'http://messageme.com',
    badUrl = 'http://wonkyserver.com',
    testTopic = '/topic/test',
    testMessage = {
      title : "Test",
        body : "Hello world"
    },
    requestMock = {
        post : function(options, callback) {
            console.log('calling mock');

            if (options.url = testUrl) {
                callback(null);
            } else {
                var err = new Error("something went wrong at the destination");
                callback(err);
            }
        }
    };

mockery.registerMock('request', requestMock);
mockery.enable({
    useCleanCache: true,
    warnOnUnregistered : false
});


var chicksub = require('chicksub'),
    chickpub = require('chickpub');

describe('sendMessageToTopic', function() {
    var chickSub = new chicksub(),
        chickPub = new chickpub(),
        testModel;



    it('should succeed when there are subscribers', function (done) {
        chickSub.subscribe(testUrl, testTopic, function(err, model) {
            if (err) {
                console.log("test skipped due to", err);
                done();
            }
            console.log('model from chicksub', model);
            testModel = model;
            chickPub.sendMessageToTopic(testMessage, testTopic, function(err, model) {
                expect(err).to.be.null;
                expect(model).to.be.json;
                expect(model.success).to.be.equal(1);
                expect(model.failed).to.be.equal(0);
                expect(model.errors).to.be.empty;
                done();
            });
        });
    });

    it('should fail if there are no subscribers', function (done) {
        chickSub.unsubscribe(testModel.uid, function(err, model) {
            if (err) {
                console.log("test skipped due to", err);
                done();
            }

            chickPub.sendMessageToTopic(testMessage, testTopic, function(err, model) {
                expect(err).to.be.not.empty;
                expect(model).to.be.json;
                expect(model.success).to.be.equal(0);
                expect(model.failed).to.be.equal(0);
                expect(model.errors).to.be.empty;
                done();
            });
        });
    });
});

