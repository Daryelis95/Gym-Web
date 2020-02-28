'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Planne extends Model {


        static get objectIDs() {
            return [ 'category_id' ]
        }

        static boot() {
           super.boot()

           this.addHook('beforeSave', async (document) => {
               if (!document.dirty.deleted_at) {
                   document.deleted_at = null
               }
           })
       }
}

module.exports = Planne
