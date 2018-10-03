const Sequelize = require('sequelize')
const db = require('../db')

const Line = db.define('line', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  last15: {
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
  },
  lastHour: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  average15: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  average30: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  averageHour: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  nForAvg: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  },
});

module.exports = Line;