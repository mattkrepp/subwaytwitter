'use strict';

const db = require('../server/db');
const {User, Line, LastUpdated} = require('../server/db/models');

async function seed() {
  await db.sync({force: true});
  console.log('db synced!');

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ]);

  const lines = await Promise.all([
    Line.create({name: '1', last15: 12, last30: 20, lastHour: 24}),
    Line.create({name: '2', last15: 12, last30: 20, lastHour: 24}),
    Line.create({name: '3', last15: 12, last30: 20, lastHour: 24}),
    Line.create({name: '4', last15: 12, last30: 20, lastHour: 24}),
    Line.create({name: '5', last15: 12, last30: 20, lastHour: 24}),
    Line.create({name: '6', last15: 12, last30: 20, lastHour: 24}),
    Line.create({name: '7', last15: 12, last30: 20, lastHour: 24}),
    Line.create({name: 'A', last15: 12, last30: 20, lastHour: 24}),
    Line.create({name: 'B', last15: 12, last30: 20, lastHour: 24}),
    Line.create({name: 'C', last15: 12, last30: 20, lastHour: 24}),
    Line.create({name: 'D', last15: 12, last30: 20, lastHour: 24}),
    Line.create({name: 'E', last15: 12, last30: 20, lastHour: 24}),
    Line.create({name: 'F', last15: 12, last30: 20, lastHour: 24}),
    Line.create({name: 'G', last15: 12, last30: 20, lastHour: 24}),
    Line.create({name: 'J', last15: 12, last30: 20, lastHour: 24}),
    Line.create({name: 'L', last15: 12, last30: 20, lastHour: 24}),
    Line.create({name: 'M', last15: 12, last30: 20, lastHour: 24}),
    Line.create({name: 'N', last15: 12, last30: 20, lastHour: 24}),
    Line.create({name: 'Q', last15: 12, last30: 20, lastHour: 24}),
    Line.create({name: 'R', last15: 12, last30: 20, lastHour: 24}),
    Line.create({name: 'S', last15: 12, last30: 20, lastHour: 24}),
    Line.create({name: 'W', last15: 12, last30: 20, lastHour: 24}),
    Line.create({name: 'Z', last15: 12, last30: 20, lastHour: 24}),
  ]);


  console.log(`seeded ${users.length} users and ${lines.length} lines.`);
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
