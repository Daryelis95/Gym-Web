'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Nutricion extends Model {

    /*
    MongoDB ObjectID türündeki alanları belirtiyoruz.
    */

    static get objectIDs() {
        return [ '_id' ]
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

module.exports = Nutricion
