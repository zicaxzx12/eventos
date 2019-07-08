/**
 * Usuario.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    firstName: {
      type:'string',
      regex: /^[a-zA-Z]+$/i,
      required: true
    },
    lastName: {
      type: 'string',
      regex: /^[a-zA-Z]+$/i,
      required: true
    },
    email: {
      type:'string',
      isEmail: true,
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      minLength: 8,
      required: true
    },
    gender: {
      type: 'string',
      isIn: ['male', 'female'],
      required: true
    }
  },

};

