'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Menu extends Model {

    static get objetoIDs(){

        return['_id', 'category_id']
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

    category() {

        return this.hasMany('App/Models/Cms/Categoria', 'category_id', '_id')
    }
}

module.exports = Menu
