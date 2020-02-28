'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ClearMenuContent extends Model {

    static get objectIDs() {
        return [ '_id' ]
    }

    static boot() {
        super.boot()
    }

    receta() {

        return this.hasOne('App/Models/Cms/Receta', 'receta_id', '_id')
    }
}

module.exports = ClearMenuContent
