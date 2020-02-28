'use strict'

const Logger = use('Logger')

class CmsLogin {

	get rules() {

		return {
            username: 'required|regex:[a-zA-Z0-9._]|min:4|max:32',
            password: 'required|min:6|max:32'
		}
	}

    get messages() {

        return {
            username: 'Please check your username',
            password: 'Please check your password'
        }
    }

    async fails(errorMessages) {
		
        this.ctx.session.withErrors(errorMessages).flashAll()
        return this.ctx.response.redirect('back')
    }
}

module.exports = CmsLogin
