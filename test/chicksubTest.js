var chicksub = require('chicksub'),
    mocha = require('mocha'),
    expect = require('chai').expect;

var validateSubscriberModel = function(model) {
    expect(model).to.be.object;
    expect(model).to.have.property('uid');
    expect(model).to.have.property('url');
    expect(model).to.have.property('topic');
};

describe('check that we can subscribe', function() {
    var sub = new chicksub(),
        testUrl = 'http://messageme.com';

    it('should return model on success', function(done) {
        var model = sub.subscribe(testUrl, function(err, model) {
            validateSubscriberModel(model);
            expect(model.url).to.equal(testUrl);
            done();
        });
    });

    it('should return error on failure', function(done) {
        var err = sub.subscribe(null);
        expect(err).to.be.object;
        expect(err).to.not.have.property('uid');
        done();
    });
});

describe('check that we can unsubscribe', function() {
    var sub = new chicksub(),
        testUrl = 'http://messageme.com',
        testModel = sub.subscribe(testUrl);

    it('should return empty model', function(done) {
        var result = sub.unsubscribe(testModel);
        expect(result).to.be.empty;
        done();
    });
});

describe('check that we can retrieve subscription records', function() {
    var sub = new chicksub(),
        testUrl = 'http://messageme.com',
        testModel = sub.subscribe(testUrl);

    it('should get back a model', function(done) {
        var subscriber = sub.getSubscriber(testModel.uid);
        validateSubscriberModel(subscriber);
        expect(subscriber).to.equal.deep(testModel);
    });
});

describe('check that we can update a subscription', function() {
    var sub = new chicksub(),
        testUrl = 'http://messageme.com',
        testModel = sub.subscribe(testUrl);

    it('should update the existing model', function(done) {
        var props = {
            'url' : 'blahblah.com',
            'topic' : '/new/topic'
        };

        sub.updateSubscription(testModel.uid, props, function(err, model) {
            expect(err).to.be.empty;
            validateSubscriberModel(model);
            expect(model.url).to.be.equal('blahblah.com');
            expect(model.topic).to.be.equal('/new/topic');
        });
    });
});