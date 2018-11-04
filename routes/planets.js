const PlanetController = require('../modules/planet/controller');

module.exports = function(server) {
    const PATH = '/planets';

	server.post({path: PATH, version: '1.0.0'}, PlanetController.create.bind(PlanetController));

    server.get({path: PATH, version: '1.0.0'},  PlanetController.list.bind(PlanetController));

    server.get({path: `${PATH}/name/:name`, version: '1.0.0'},  PlanetController.getByName.bind(PlanetController));

    server.get({path: `${PATH}/:id`, version: '1.0.0'},  PlanetController.getById.bind(PlanetController));

    server.del({path: `${PATH}/:id`, version: '1.0.0'},  PlanetController.remove.bind(PlanetController));
};