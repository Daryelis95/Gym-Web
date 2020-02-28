'use strict'

/*
|--------------------------------------------------------------------------
| MenuSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class MenuSeeder {
  async run () {

    const menus = await Database.table('menus')
    console.log(menus)
  }
}

module.exports = MenuSeeder
