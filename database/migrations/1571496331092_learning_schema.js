'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LearningSchema extends Schema {
  up () {
    this.create('learnings', (table) => {
      table.increments()
      table.string('title', 100).notNullable
      table.string('category', 200).notNullable
      //table.string('image', 250).notNullable
      //table.string('tags', 100).notNullable
      table.string('description' , 400).notNullable
      //table.string('date', 100).notNullable
      table.string('status', 100).notNullable
      //table.string('icon', 80).notNullable
      table.timestamps()
    })
  }

  down () {
    this.drop('learnings')
  }
}

module.exports = LearningSchema
