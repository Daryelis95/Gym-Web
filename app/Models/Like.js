'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Like extends Model {

    static get objectIDs() {
        return [ 'content_id', '_id', 'user_id' ]
    }

    static boot() {
        super.boot()
    }
}

module.exports = Like
