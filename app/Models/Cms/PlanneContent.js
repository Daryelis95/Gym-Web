'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PlanneContent extends Model {

    static get objectIDs() {

        return [ '_id', 'content_id', 'planne_id']
    }

    static boot() {

       super.boot()

       this.addHook('beforeSave', async (document) => {
           if (!document.dirty.deleted_at) {
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

   content() {

       return this.hasOne('App/Models/Cms/Receta', 'content_id', '_id')
   }
}

module.exports = PlanneContent
