class PlanetService {

    constructor() {
        this.repository = require('./repository');
        this.axios = require('axios');
        this.errors = require('restify-errors');
        this.logger = require('../../winston-custom-log');
    }

    create(planet) {
        return this.updateNumbersOfFilms(planet)
            .then( doc => this.repository.save(doc))
            .then((doc) => {
                this.logger.info(`PlanetService::create => Planeta ${planet.name} cadastrado com sucesso.`);
                return doc;
            }).catch((err) => {
                this.logger.error(`PlanetService::create => Falha ao cadastrar o planeta: ${planet.name}`);
                throw err;
            });
    }

    updateNumbersOfFilms(planet) {
        this.logger.info(`PlanetService::updateNumbersOfFilms => Iniciando consulta de participacoes em filmes.`);
        let planetUrl = `https://swapi.co/api/planets?search=${planet.name}`;
        return this.axios.get(planetUrl).then(response => {
            if(response.data.count > 0) {
                this.logger.info(`PlanetService::updateNumbersOfFilms => Participacoes em filmes encontrada com sucesso.`);
                planet.numbersOfMovies = response.data.results[0].films.length;
                return planet;
            } else {
                this.logger.error(`PlanetService::updateNumbersOfFilms => Participacoes em filmes nao foi encontrada.`);
                throw new this.errors.BadRequestError('Planet is not valid!');
            }
        }).catch((err) => {
            this.logger.error(`PlanetService::updateNumbersOfFilms => Falha ao obter participações em filmes para o planeta: ${planet.name}`);
            throw err;
        });
    }
}

module.exports = new PlanetService();