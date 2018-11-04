const sinon = require('sinon');
const expect = require('chai').expect;
const controller = require('../controller.js');
const winston = require('../../../winston-custom-log');

describe('Unit Test - PlanetController', function() {

    winston.transports[1].silent = true;
    let req = {body: {}};
    let res = {send: function(){}};
    let next = function(){};

    describe('create', function() {
        it('Deve retornar BadRequest - Campos obrigatórios', () => {
            let isValidPlanet = sinon.stub(controller, "isValidPlanet").returns(false);    
            let sendSpy = sinon.spy(res, "send");

            controller.create(req, res, next);

            expect(isValidPlanet.calledOnce).to.be.equal(true);
            expect(sendSpy.withArgs(400).calledOnce).to.be.equal(true);

            isValidPlanet.restore();
            sendSpy.restore();
        });

        it('Deve cadastrar o planeta e retornar HTTP Status Code 201', (done) => {
            let isValidPlanet = sinon.stub(controller, "isValidPlanet").returns(true);
            let serviceCreate = sinon.stub(controller.service, "create").resolves({_id:156});
            let sendSpy = sinon.spy(res, "send");

            controller.create(req, res, next).then( ()=> {
                expect(isValidPlanet.calledOnce).to.be.equal(true);
                expect(serviceCreate.calledOnce).to.be.equal(true);
                expect(sendSpy.withArgs(201).calledOnce).to.be.equal(true);

                isValidPlanet.restore();
                serviceCreate.restore();
                sendSpy.restore();
                done();
            });
        });

        it('Não deve cadastrar o planeta e retornar HTTP Status Code 500', (done) => {
            let isValidPlanet = sinon.stub(controller, "isValidPlanet").returns(true);
            let serviceCreate = sinon.stub(controller.service, "create").rejects('error');
            let sendSpy = sinon.spy(res, "send");
            
            controller.create(req, res, next).then(()=> {
                expect(isValidPlanet.calledOnce).to.be.equal(true);
                expect(serviceCreate.calledOnce).to.be.equal(true);
                expect(sendSpy.withArgs(500).calledOnce).to.be.equal(true);

                isValidPlanet.restore();
                serviceCreate.restore();
                sendSpy.restore();
                done();
            }).catch((done));

        });
    });

    describe('list', function() {
        it('Deve retornar a lista de planetas e retornar HTTP Status Code 200', (done) => {
            let repositoryList = sinon.stub(controller.repository, "list").resolves([{id:1}]);
            let sendSpy = sinon.spy(res, "send");

            controller.list(req, res, next).then((result)=> {
                expect(repositoryList.calledOnce).to.be.equal(true);
                expect(sendSpy.withArgs(200, [{id:1}]).calledOnce).to.be.equal(true);

                repositoryList.restore();
                sendSpy.restore();
                done();
            });
        });

        it('Não deve retornar a lista de planetas e retornar HTTP Status Code 500', (done) => {
            let isValidPlanet = sinon.stub(controller, "isValidPlanet").returns(true);
            let serviceCreate = sinon.stub(controller.service, "create").rejects('error');
            let sendSpy = sinon.spy(res, "send");
            
            controller.create(req, res, next).then(()=> {
                expect(isValidPlanet.calledOnce).to.be.equal(true);
                expect(serviceCreate.calledOnce).to.be.equal(true);
                expect(sendSpy.withArgs(500).calledOnce).to.be.equal(true);

                isValidPlanet.restore();
                serviceCreate.restore();
                sendSpy.restore();
                done();
            }).catch((done));

        });
    });

    describe('getByName', function() {
        it('Deve retornar BadRequest - Campos obrigatórios', () => {
            let sendSpy = sinon.spy(res, "send");
            req = {params: {}};

            controller.getByName(req, res, next);
            expect(sendSpy.withArgs(400).calledOnce).to.be.equal(true);
            
            sendSpy.restore();
        });

        it('Deve retornar o planeta informado e retornar HTTP Status Code 200', (done) => {
            let repositoryByName = sinon.stub(controller.repository, "getByName").resolves([{id:1}]);
            let sendSpy = sinon.spy(res, "send");
            req = {params: {name: 'Alderaan'}};

            controller.getByName(req, res, next).then((result)=> {
                expect(repositoryByName.calledOnce).to.be.equal(true);
                expect(sendSpy.withArgs(200, [{id:1}]).calledOnce).to.be.equal(true);

                repositoryByName.restore();
                sendSpy.restore();
                done();
            });
        });

        it('Não retorna o planeta informado e retornar HTTP Status Code 404', (done) => {
            let repositoryByName = sinon.stub(controller.repository, "getByName").resolves(null);
            let sendSpy = sinon.spy(res, "send");
            req = {params: {name: 'Alderaan'}};

            controller.getByName(req, res, next).then((result)=> {
                expect(repositoryByName.calledOnce).to.be.equal(true);
                expect(sendSpy.withArgs(404).calledOnce).to.be.equal(true);

                repositoryByName.restore();
                sendSpy.restore();
                done();
            });
        });

        it('Não deve retornar o planeta informado e retornar HTTP Status Code 500', (done) => {
            let repositoryByName = sinon.stub(controller.repository, "getByName").rejects('error');
            let sendSpy = sinon.spy(res, "send");
            req = {params: {name: 'Alderaan'}};

            controller.getByName(req, res, next).then(()=> {
                expect(repositoryByName.calledOnce).to.be.equal(true);
                expect(sendSpy.withArgs(500).calledOnce).to.be.equal(true);

                repositoryByName.restore();
                sendSpy.restore();
                done();
            }).catch((done));
        });
    });

    describe('getById', function() {
        it('Deve retornar BadRequest - Campos obrigatórios', () => {
            let sendSpy = sinon.spy(res, "send");
            req = {params: {}};

            controller.getById(req, res, next);
            expect(sendSpy.withArgs(400).calledOnce).to.be.equal(true);
            
            sendSpy.restore();
        });

        it('Deve retornar o planeta com ID informado e retornar HTTP Status Code 200', (done) => {
            let repositoryById = sinon.stub(controller.repository, "getById").resolves([{id:1}]);
            let sendSpy = sinon.spy(res, "send");
            req = {params: {id: '5bde4e482aac450012d62568'}};

            controller.getById(req, res, next).then(()=> {
                expect(repositoryById.calledOnce).to.be.equal(true);
                expect(sendSpy.withArgs(200, [{id:1}]).calledOnce).to.be.equal(true);

                repositoryById.restore();
                sendSpy.restore();
                done();
            });
        });

        it('Não retorna o planeta com ID informado e retornar HTTP Status Code 404', (done) => {
            let repositoryById = sinon.stub(controller.repository, "getById").resolves(null);
            let sendSpy = sinon.spy(res, "send");
            req = {params: {id: '5bde4e482aac450012d62568'}};

            controller.getById(req, res, next).then(()=> {
                expect(repositoryById.calledOnce).to.be.equal(true);
                expect(sendSpy.withArgs(404).calledOnce).to.be.equal(true);

                repositoryById.restore();
                sendSpy.restore();
                done();
            });
        });

        it('Não deve retornar o planeta informado e retornar HTTP Status Code 500', (done) => {
            let repositoryById = sinon.stub(controller.repository, "getById").rejects('error');
            let sendSpy = sinon.spy(res, "send");
            req = {params: {id: '5bde4e482aac450012d62568'}};

            controller.getById(req, res, next).then(()=> {
                expect(repositoryById.calledOnce).to.be.equal(true);
                expect(sendSpy.withArgs(500).calledOnce).to.be.equal(true);

                repositoryById.restore();
                sendSpy.restore();
                done();
            }).catch((done));
        });
    });

    describe('remove', function() {
        it('Deve retornar BadRequest - Campos obrigatórios', () => {
            let sendSpy = sinon.spy(res, "send");
            req = {params: {}};

            controller.remove(req, res, next);
            expect(sendSpy.withArgs(400).calledOnce).to.be.equal(true);
            
            sendSpy.restore();
        });

        it('Deve remover o planeta com ID informado e retornar HTTP Status Code 204', (done) => {
            let repositoryRemove = sinon.stub(controller.repository, "delete").resolves({n:1});
            let sendSpy = sinon.spy(res, "send");
            req = {params: {id: '5bde4e482aac450012d62568'}};

            controller.remove(req, res, next).then(()=> {
                expect(repositoryRemove.calledOnce).to.be.equal(true);
                expect(sendSpy.withArgs(204).calledOnce).to.be.equal(true);

                repositoryRemove.restore();
                sendSpy.restore();
                done();
            });
        });

        it('Não retorna o planeta com ID informado e retornar HTTP Status Code 404', (done) => {
            let repositoryRemove = sinon.stub(controller.repository, "delete").resolves({});
            let sendSpy = sinon.spy(res, "send");
            req = {params: {id: '5bde4e482aac450012d62568'}};

            controller.remove(req, res, next).then(()=> {
                expect(repositoryRemove.calledOnce).to.be.equal(true);
                expect(sendSpy.withArgs(404).calledOnce).to.be.equal(true);

                repositoryRemove.restore();
                sendSpy.restore();
                done();
            });
        });

        it('Não deve retornar o planeta informado e retornar HTTP Status Code 500', (done) => {
            let repositoryById = sinon.stub(controller.repository, "getById").rejects('error');
            let sendSpy = sinon.spy(res, "send");
            req = {params: {id: '5bde4e482aac450012d62568'}};

            controller.getById(req, res, next).then(()=> {
                expect(repositoryById.calledOnce).to.be.equal(true);
                expect(sendSpy.withArgs(500).calledOnce).to.be.equal(true);

                repositoryById.restore();
                sendSpy.restore();
                done();
            }).catch((done));
        });
    }); 
});