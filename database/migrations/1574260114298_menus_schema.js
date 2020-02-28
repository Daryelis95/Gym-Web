'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MenusSchema extends Schema {
  up () {
    this.create('menus', (table) => {
      table.increments()
      table.string('title', 80).notNullable()
      table.string('desayuno', 300).notNullable()
      table.string('mediatarde', 300).notNullable()
      table.string('cena', 300).notNullable()
      table.boolean('status', 50).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('menus')
  }
}

module.exports = MenusSchema
