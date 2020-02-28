'use strict'

/*
|--------------------------------------------------------------------------
| LearningSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class LearningSeeder {
  async run () {
    await Factory.get('learning').create()
  }
}

module.exports = LearningSeeder
