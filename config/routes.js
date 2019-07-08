/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  'POST  /users': 'UsuarioController.create',
  'POST  /users/login': 'UsuarioController.login',
  'GET  /users/logout': 'UsuarioController.logout',

  'POST /events': 'EventoController.create',
  'POST /events/attendance/:id': 'EventoController.attend',
  'DELETE /events/attendance/:id': 'EventoController.cancelattend',
  'GET  /events': 'EventoController.list',
  'GET /eventos': 'EventoController.subscribe',

  'GET  /images/:fileName': 'ImagenController.load',
  'POST /images': 'ImagenController.create',
  
};
