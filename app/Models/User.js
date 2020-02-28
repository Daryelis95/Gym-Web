'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {

	static boot() {

		super.boot()

		this.addHook('beforeSave', async (document) => {
			if (document.dirty.password) {
				document.password = await Hash.make(document.password)
			}
		})
	}

	tokens() {
		return this.hasMany('App/Models/Token')
	}
}

module.exports = User
