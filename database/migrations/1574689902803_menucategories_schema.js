'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MenucategoriesSchema extends Schema {
  up () {
    this.create('categorias', (table) => {
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
    this.drop('menucategories')
  }
}

module.exports = MenucategoriesSchema
