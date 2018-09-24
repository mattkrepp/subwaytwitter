const Sequelize = require('sequelize')
const db = require('../db')

const NYCT = db.define('nyct', {
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  time: {
    type: Sequelize.DATE,
  },

});

module.exports = NYCT;