'use strict'

class CmsDashboard {

    get rules() {

		return {
            username    : 'regex:[a-zA-Z0-9._]|min:4|max:32|unique:admins',
            password    : 'min:6|max:32|same:password_repeat',
            roles       : 'required'
		}
	}

    get messages() {

        return {
            'username.unique'   : 'Username is already registered',
            'username.required' : 'Invalid username',
            'username.min'      : 'Username must bigger than 4 character',
            'username.max'      : 'Username must smaller than 32 character',
            'password.required' : 'Invalid password',
            'password.same'     : 'Password matches is wrong',
            'password.min'      : 'Password must bigger than 4 character',
            'password.max'      : 'Password must small than 32 character',
            'roles.required'    : 'Invalid role'
        }
    }

    async fails(errorMessages) {

        this.ctx.session
            .flash({ form : 'Please check your form data' })
            .withErrors(errorMessages)
            .flashAll()

        return this.ctx.response.route('cms.dashboard', this.ctx.request.all())
    }
}

module.exports = CmsDashboard
