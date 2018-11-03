class PlanetController {

    constructor() {
        this.repository = require('./repository');
    }
    
    create(req, res, next) {
      //logger.info('ApplicationController::create => Iniciando cadastro de aplicação.');
      const planet = req.body || {};
      if (!this.isValidPlanet(planet)) {
        res.send(400, {
          message: 'Um ou mais campos obrigatórios não foram informados.',
        });
        return next();
      }
  
      this.repository.save(planet)
        .then((doc) => {
          //logger.info(`ApplicationController::create => Aplicação ${application.name} cadastrada com sucesso.`);
          res.send(201, { id: doc._id });
          return next();
        })
        .catch((err) => {
          //logger.error(`ApplicationController::create => Falha ao cadastrar a aplicação: ${application.name}`);
          console.log(err);
          res.send(500);
          return next();
        });
    }


    list(req, res, next) {
        //logger.info('PlanetController::list => Iniciando consulta de aplicações.');
        this.repository.list()
          .then((doc) => {
            //logger.info('PlanetController::list => Aplicações retornadas com sucesso.');
            res.send(200, doc);
            return next();
          })
          .catch((err) => {
            //logger.error('PlanetController::list => Falha ao consultar aplicações.');
            console.log(err);
            res.send(500);
            return next();
          });
    }

    isValidPlanet(planet) {
      //logger.info('ApplicationController::isValidApplication => Validando campos obrigatórios para aplicação.');
      if (!planet.name || !planet.climate || !planet.terrain) {
        //logger.error('ApplicationController::isValidApplication => Um ou mais campos obrigatórios não foram informados.');
        return false;
      }
      //logger.info('ApplicationController::isValidApplication => Campos obrigatórios validados com sucesso.');
      return true;
    }
}

module.exports = new PlanetController();