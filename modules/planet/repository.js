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

    query(queryString, pages=1, perPage=10) {
      this.logger.info('PlanetRepository::query => Consultando planeta(s) no banco de dados');

      const queryStringMap = new Map(Object.entries(queryString));
      pages = queryStringMap.has('page') ? Number(queryStringMap.get('page')) : pages;
      perPage = queryStringMap.has('per_page') ? Number(queryStringMap.get('per_page')) : perPage;
      const { page, per_page, ...queryForMongo } = queryString;

      
      return this.model.find(queryForMongo)
        .skip((pages - 1) * perPage)
        .limit(perPage)
        .then((doc) => {
          if(doc.length > 1) {
            return this.model.estimatedDocumentCount({})
              .then((total) => {
                let result = {};
                result.count = total;
                result.results = doc;
                return result;
              })
          } else {
            return doc[0];
          }
          
        }).catch((error) => {
          console.log(error);
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