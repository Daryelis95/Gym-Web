'use strict'

const Logger = use('Logger')

class Register {

	get rules() {

		return {
			email: 'required|email',
            password: 'required|min:6|max:32'
		}
	}

    get messages() {

        return {
			'email.required'      	: 'Invalid email',
			'password.required'     : 'Invalid password',
            'password.min'          : 'Password must bigger than 2 character',
            'password.max'          : 'Password must smaller than 60 character',
			'password.confirmed'    : 'Confirmed validation failed'
        }
    }

    async fails(errorMessages) {

		this.ctx.session
            .flash({ form : 'Please check your form data' })
            .withErrors(errorMessages)
            .flashAll()

        return this.ctx.response.route('login', this.ctx.request.all())
    }
}

module.exports = Register
