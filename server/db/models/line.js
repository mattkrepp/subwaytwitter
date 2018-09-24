const Sequelize = require('sequelize')
const db = require('../db')

const Line = db.define('line', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  lastHour: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  last30: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  }
});

module.exports = Line;