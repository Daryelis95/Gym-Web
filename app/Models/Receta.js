'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Receta extends Model {

    static get objectIDs() {
        return [ 'category_id', '_id' ]
    }

    static boot() {
        super.boot()
    }

    category() {
        return this.hasOne('App/Models/Cms/RecetaCategory', 'category_id', '_id')
    }

    ingredients() {
        return this.hasMany('App/Models/RecetaImage', '_id', 'receta_id')
    }

    like() {
        return this.hasOne('App/Models/Like', '_id', 'content_id')
    }
}

module.exports = Receta
