'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const slug = require('slug')

class RecetaImage extends Model {

    static get table () {

        return 'receta_images'
    }

    static get objectIDs() {

        return [ '_id', 'receta_id' ]
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

module.exports = RecetaImage
