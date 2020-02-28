'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserClearMenu extends Model {

    static get objectIDs() {
        return [ '_id' ]
    }

    static boot() {
        super.boot()
    }
}

module.exports = UserClearMenu
