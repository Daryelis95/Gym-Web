'use strict'

const Logger = use('Logger')

class User {

	get rules() {

		return {
            name: 'required|min:2|max:60',
			surname: 'required|min:2|max:60',
			email: 'required|email',
            password: 'min:6|max:32',
			gender: 'required'
		}
	}

    get messages() {

        return {
			'name.required'        	: 'Invalid name',
            'name.min'             	: 'Name must bigger than 2 character',
            'name.max'             	: 'Name must smaller than 60 character',
			'surname.required'      : 'Invalid surname',
            'surname.min'           : 'Surname must bigger than 2 character',
            'surname.max'           : 'Surname must smaller than 60 character',
			'email.required'      	: 'Invalid email',
			'password.required'     : 'Invalid password',
            'password.min'          : 'Password must bigger than 2 character',
            'password.max'          : 'Password must smaller than 60 character',
			'password.confirmed'    : 'Confirmed validation failed',
			'gender.required'     	: 'Invalid gender',
        }
    }

    async fails(errorMessages) {

		this.ctx.session
            .flash({ form : 'Please check your form data' })
            .withErrors(errorMessages)
            .flashAll()

        return this.ctx.response.route('cms.users', this.ctx.request.all())
    }
}

module.exports = User
