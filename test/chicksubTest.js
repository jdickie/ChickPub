var chicksub = require('chicksub'),
    mocha = require('mocha'),
    expect = require('chai').expect;

var validateSubscriberModel = function(model) {
    expect(model).to.be.object;
    expect(model).to.have.property('uid');
    expect(model).to.have.property('url');
    expect(model).to.have.property('topic');
};

describe('ChickSub.subscribe...', function() {
    var sub = new chicksub(),
        testUrl = 'http://messageme.com',
        testTopic = '/topic/test';

    it('should return model on success', function(done) {
        sub.subscribe(testUrl, testTopic, function(err, model) {
            validateSubscriberModel(model);
            expect(model.url).to.equal(testUrl);
            done();
        });
    });

    it('should return error on failure', function(done) {
        sub.subscribe(null, null, function(err, model) {
            expect(err).to.be.object;
            expect(err).to.not.have.property('uid');
            done();
        });
    });
});

describe('check that we can unsubscribe', function() {
    var sub = new chicksub(),
        testUrl = 'http://messageme.com',
        testModel,
        testTopic = '/topic/test';

    before(function(done) {
        sub.subscribe(testUrl, testTopic, function(err, model) {
            testModel = model;
            done();
        });
    });

    it('should return empty model', function(done) {
        sub.unsubscribe(testModel.uid, function(err, result) {
            expect(err).to.be.object;
            expect(result).to.be.empty;
            done();
        });
    });
});

describe('check that we can retrieve subscription records', function() {
    var sub = new chicksub(),
        testUrl = 'http://messageme.com',
        testModel,
        testTopic = '/topic/test';

    before(function(done) {
        sub.subscribe(testUrl, testTopic, function(err, model) {
            testModel = model;
            done();
        });
    });

    it('should get back a model', function(done) {
        sub.getSubscriber(testModel.uid, function(err, subscriber) {
            expect(err).to.be.null;
            validateSubscriberModel(subscriber);
            expect(subscriber).to.deep.equal(testModel);
            done();
        });

    });
});

describe('check that we can update a subscription', function() {
    var sub = new chicksub(),
        testUrl = 'http://messageme.com',
        testModel,
        testTopic = '/topic/test';

    before(function(done) {
        sub.subscribe(testUrl, testTopic, function(err, model) {
            testModel = model;
            done();
        });
    });

    it('should update the existing model', function(done) {
        var props = {
            'url' : 'blahblah.com',
            'topic' : '/new/topic'
        };

        sub.updateSubscription(testModel.uid, props, function(err, model) {
            expect(err).to.be.null;
            validateSubscriberModel(model);
            expect(model.url).to.be.equal('blahblah.com');
            expect(model.topic).to.be.equal('/new/topic');
            done();
        });
    });
});