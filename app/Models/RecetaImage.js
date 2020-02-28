'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class RecetaImage extends Model {

    static get table () {

        return 'receta_images'
    }

    static get objectIDs() {

        return [ '_id', 'receta_id' ]
    }

    static boot() {

       super.boot()
   }
}

module.exports = RecetaImage
