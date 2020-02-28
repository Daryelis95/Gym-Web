'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class RetoSubCategory extends Model {
    static get table () {

        return 'reto_subcategories'
    }

    static get objectIDs() {

        return [ '_id', 'category_id' ]
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
       })
   }
}

module.exports = RetoSubCategory
