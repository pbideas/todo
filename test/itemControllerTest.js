var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();

chai.use(chaiHttp);

var id = '';

describe('API', function() {
    it('should list ALL items on /item GET', function(done) {
        chai.request(app)
            .get('/api/item')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                done();

            });
    });
    it('should add a SINGLE item on /item POST', function(done) {
        chai.request(app)
            .post('/api/item')
            .send({ 'content': 'TesT', 'isDone': 'false', 'hasAttachment': 'false' })
            .end(function(err, res) {
                id = res.headers.location;
                id = id.substring(id.lastIndexOf('/') + 1, id.length);
                res.should.have.status(201);
                id.should.not.be.empty;
                done();

            });
    });
    it('should list a SINGLE item on /item/<id> GET (' + id + ')', function(done) {
        chai.request(app)
            .get('/api/item/' + id)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('content');
                res.body.should.have.property('isDone');
                res.body.should.have.property('hasAttachment');
                res.body._id.should.equal(id);
                done();
            });
    });

    it('should update a SINGLE item on /item/<id> PUT (' + id + ')', function(done) {
        var testContent = 'TesT2';
        var testIsDone = true;
        var testHasAttachment = false;
        chai.request(app)
            .put('/api/item/' + id)
            .send({ 'content': testContent, 'isDone': testIsDone, 'hasAttachment': testHasAttachment })
            .end(function(err, res) {
                res.should.have.status(200);
                chai.request(app)
                    .get('/api/item/' + id)
                    .end(function(err, response) {
                        response.should.have.status(200);
                        response.should.be.json;
                        response.body.should.be.a('object');
                        response.body.should.have.property('_id');
                        response.body._id.should.equal(id);
                        response.body.should.have.property('content');
                        response.body.content.should.equal(testContent);
                        response.body.should.have.property('isDone');
                        response.body.isDone.should.equal(testIsDone);
                        response.body.should.have.property('hasAttachment');
                        response.body.hasAttachment.should.equal(testHasAttachment);
                        done();
                    });
            });
    });
    it('should delete a SINGLE item on /item/<id> DELETE (' + id + ')', function(done) {
        chai.request(app)
            .delete('/api/item/' + id)
            .end(function(error, response) {
                response.should.have.status(200);
                done();
            });
    });

});
