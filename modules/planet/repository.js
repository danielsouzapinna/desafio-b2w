class PlanetRepository {

    constructor() {
        this.model = require('./model/planet');
    }

    save(planet) {
        //logger.info(`PlanetRepository::save => Gravando a aplicação: ${application.name} no banco de dados`);
        return this.model(planet).save();
    }

    list() {
        //logger.info('PlanetRepository::list => Consultando aplicações no banco de dados');
        return this.model.apiQuery({});
    }
}

module.exports = new PlanetRepository();