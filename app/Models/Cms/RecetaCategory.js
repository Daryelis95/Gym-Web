'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const slug = require('slug')

class RecetaCategory extends Model {

    static get table () {

        return 'receta_categories'
    }

    static get objectIDs() {

        return [ '_id' ]
    }

    subcategories() {

        return this.hasMany('App/Models/Cms/RecetaSubCategory', '_id', 'category_id')
    }

    static boot() {

       super.boot()

       this.addHook('beforeSave', async (document) => {

           if(!document.dirty.deleted_at) {
               document.deleted_at = null
           }

           if(!document.dirty.status || document.dirty.status === false) {
               document.status = false
           }
           else {
               document.status = true
           }

           document.slug = slug(document.title, {
               lower: true
           })
       })
   }
}

module.exports = RecetaCategory
