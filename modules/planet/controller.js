class PlanetController {

    constructor() {
        this.repository = require('./repository');
        this.service = require('./service');
        this.logger = require('../../winston-custom-log');
    }
    

    create(req, res, next) {
      this.logger.info('PlanetController::create => Iniciando cadastro de planeta.');
      const planet = req.body || {};
      if (!this.isValidPlanet(planet)) {
        res.send(400, {
          message: 'Um ou mais campos obrigatórios não foram informados.',
        });
        return next();
      }

      return this.service.create(planet).then((doc) => {
        this.logger.info(`PlanetController::create => Planeta ${planet.name} cadastrado com sucesso.`);
        res.send(201, { id: doc._id });
        return next();
      }).catch((err) => {
        this.logger.error(`PlanetController::create => Falha ao cadastrar o planeta: ${planet.name}`);
        res.send(500);
        return next();
      });
    }


    list(req, res, next) {
      this.logger.info('PlanetController::list => Iniciando listagem de planetas.');
      return this.repository.list().then((doc) => {
        this.logger.info('PlanetController::list => Planetas retornados com sucesso.');
        res.send(200, doc);
          return next();
      }).catch((err) => {
        this.logger.error('PlanetController::list => Falha ao listar planetas.');
        console.log(err);
        res.send(500);
        return next();
      });
    }


    getByName(req, res, next) {
      this.logger.info(`PlanetController::get => Iniciando consulta de planeta por nome: ${req.params.name}`);
  
      if (!req.params.name) {
        this.logger.error('PlanetController::get => Um ou mais campos obrigatórios não foram informados.');
        res.send(400, { message: 'Campo Name é obrigatório.' });
        return next();
      }
  
      return this.repository.getByName(req.params.name).then((doc) => {
        if (doc) {
          this.logger.info(`PlanetController::get => A consulta retornou o planeta: ${doc.name}.`);
          res.send(200, doc);
          return next();
        }
        this.logger.warn(`PlanetController::get => A consulta não encontrou nenhum planeta de nome: ${req.params.name}.`);
        res.send(404);
        return next();
      }).catch((err) => {
        this.logger.error(`PlanetController::get => Falha ao consultar o planeta de nome: ${req.params.name}.`);
        res.send(500);
        return next();
      });
    }


    getById(req, res, next) {
      this.logger.info(`PlanetController::get => Iniciando consulta do planeta de ID: ${req.params.id}`);
  
      if (!req.params.id) {
        this.logger.error('PlanetController::get => Um ou mais campos obrigatórios não foram informados.');
        res.send(400, { message: 'Campo ID é obrigatório.' });
        return next();
      }
  
      return this.repository.getById(req.params.id).then((doc) => {
        if (doc) {
          this.logger.info(`PlanetController::get => A consulta retornou o planeta: ${doc.name}.`);
          res.send(200, doc);
          return next();
        }
        this.logger.warn(`PlanetController::get => A consulta não encontrou nenhum planeta de ID: ${req.params.id}.`);
        res.send(404);
        return next();
      }).catch((err) => {
        this.logger.error(`PlanetController::get => Falha ao consultar a planeta de ID: ${req.params.id}.`);
        if (err && err.body && err.body.code === 'InvalidArgument') {
          res.send(404);
          return next();
        }
        res.send(500);
        return next();
      });
    }


    remove(req, res, next) {
      this.logger.info(`PlanetController::remove => Iniciando deleção do planeta de ID: ${req.params.id}.`);

      if (!req.params.id) {
        this.logger.error('PlanetController::remove => Um ou mais campos obrigatórios não foram informados.');
        res.send(400, { message: 'Campo ID é obrigatório.' });
        return next();
      }

      return this.repository.delete(req.params.id).then((doc) => {
        if (doc.n === 1) {
          this.logger.info(`PlanetController::remove => Planeta de ID ${req.params.id} removido com sucesso.`);
          res.send(204);
          return next();
        }

        this.logger.warn(`PlanetController::remove => Planeta de ID: ${req.params.id} não foi encontrado.`);
        res.send(404);
        return next();
      }).catch((err) => {
        this.logger.error(`PlanetController::remove => Falha ao remover o planeta de ID: ${req.params.id}.`);
        res.send(500);
        return next();
      });
    }

    isValidPlanet(planet) {
      this.logger.info('PlanetController::isValidPlanet => Validando campos obrigatórios para planeta.');
      if (!planet.name || !planet.climate || !planet.terrain) {
        this.logger.error('PlanetController::isValidPlanet => Um ou mais campos obrigatórios não foram informados.');
        return false;
      }
      this.logger.info('PlanetController::isValidPlanet => Campos obrigatórios validados com sucesso.');
      return true;
    }
}

module.exports = new PlanetController();