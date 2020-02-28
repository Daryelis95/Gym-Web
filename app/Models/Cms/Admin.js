'use strict'

const Hash  = use('Hash')
const Model = use('Model')

class Admin extends Model {

    static boot() {

		super.boot()

		this.addHook('beforeSave', async (document) => {
			if (document.dirty.password) {
				document.password = await Hash.make(document.password)
			}

            if (!document.dirty.deleted_at) {
                document.deleted_at = null
            }
		})
	}

	tokens() {
        
		return this.hasMany('App/Models/Token')
	}

    softDelete() {

        this.deleted_at = new Date()
        return this.save()
    }
}

module.exports = Admin
