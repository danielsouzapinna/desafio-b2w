const expect = require('chai').expect;
const supertest = require('supertest');
const server = require('../../../index');
const winston = require('../../../winston-custom-log');

describe.only('Integration Test', function() {
    
    winston.transports[1].silent = true;
    const request = supertest(server);
    
    after(function(){
        server.close();
    });

    it('Lista todos os planetas', (done) => {
        request
            .get('/planets')
            .expect('Content-Type', /json/)
            .expect(500)
            .end(function(err,res){
                expect(res.body).to.be.an('array').that.is.empty;
                done();
            });
    });

    it('Cadastra um planeta', (done) => {
        request
            .post('/planets', {name: "Alderaan", climate: "temperate", terrain: "grasslands, mountains"})
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function(err,res){
                done();
            });
    });

    it('Consultando planeta por nome', (done) => {
        request
            .get('/planets/name/Alderaan')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err,res){
                done();
            });
    });

});