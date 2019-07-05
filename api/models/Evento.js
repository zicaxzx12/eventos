/**
 * Evento.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    date: {
      type: 'ref',
      required: true,
      columnType: 'Datetime'
    },
    imagen: {
      type: 'string',
      required: true
    },
    attendances: {
      type: 'number',
      required: false,
      columnType: 'int'
    },
    willYouAttend: {
      type: 'boolean',
      required: false
    },
    Lat: {
      type: 'number',
      columnType: 'int',
      required: true
    },
    Lon: {
      type: 'number',
      columnType: 'int',
      required: true
    }

  },

};

