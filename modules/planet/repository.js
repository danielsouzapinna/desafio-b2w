class PlanetRepository {

    constructor() {
        this.model = require('./model/planet');
        this.errors = require('restify-errors');
        this.logger = require('../../winston-custom-log');
    }

    save(planet) {
        this.logger.info(`PlanetRepository::save => Gravando o planeta: ${planet.name} no banco de dados`);
        return this.model(planet).save()
        .catch((error) => {
          if (error.code === 11000) {
            this.logger.error(`PlanetRepository::save => O planeta: ${planet.name} já existe.`);
            throw new this.errors.BadRequestError('The planet already exists!');
          } else {
            this.logger.error('PlanetRepository::save => Erro ao realizar cadastro no banco de dados.');
            throw new this.errors.InternalError();
          }
        });
    }

    list(page, perPage) {
      this.logger.info('PlanetRepository::list => Consultando planetas no banco de dados');
      return this.model.find()
        .skip((page - 1) * perPage)
        .limit(perPage)
        .then((doc) => {
          return this.model.estimatedDocumentCount({})
            .then((total) => {
              let result = {};
              result.count = total;
              result.results = doc;
              return result;
            })
        });
      }

    getByName(planetName) {
      this.logger.info(`PlanetRepository::getByName => Consultando o planeta : ${planetName} no banco de dados`);
        return this.model.findOne({ name: planetName }).exec()
          .catch((error) => {
            if (error.name === 'CastError') {
              this.logger.error(`PlanetRepository::getByName => O planeta: ${planetName} não é válido.`);
              throw new this.errors.InvalidArgumentError();
            } else {
              this.logger.error('PlanetRepository::getByName => Erro ao realizar consulta no banco de dados.');
              throw new this.errors.InternalError();
            }
        });
    }

    getById(planetId) {
      this.logger.info(`PlanetRepository::getById => Consultando o planeta de ID: ${planetId} no banco de dados`);
        return this.model.findById({ _id: planetId }).exec()
          .catch((error) => {
            if (error.name === 'CastError') {
              this.logger.error(`PlanetRepository::getById => O ID: ${planetId} não é válido.`);
              throw new errors.InvalidArgumentError();
            } else {
              this.logger.error('PlanetRepository::getById => Erro ao realizar consulta no banco de dados.');
              throw new errors.InternalError();
            }
        });
    }

    delete(planetId) {
      this.logger.info(`PlanetRepository::delete => Removendo o planeta de ID: ${planetId} no banco de dados`);
        return this.model.deleteOne({ _id: planetId }).exec()
          .catch((error) => {
            if (error.name === 'CastError') {
              this.logger.error(`PlanetRepository::delete => O ID: ${planetId} não é válido.`);
              throw new errors.InvalidArgumentError();
            } else {
              this.logger.error('PlanetRepository::delete => Erro ao realizar remoção no banco de dados.');
              throw new errors.InternalError();
            }
        });
    }
}

module.exports = new PlanetRepository();