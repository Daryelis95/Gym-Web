'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class RecetaCategory extends Model {

    static get table () {
        return 'reto_categories'
    }

    static get objectIDs() {
        return [ '_id' ]
    }

    subcategories() {
        return this.hasMany('App/Models/Cms/RecetaSubCategory', '_id', 'category_id')
    }

    static boot() {
       super.boot()
   }
}

module.exports = RecetaCategory
