'use strict'

class UpdateProfile {
  get rules () {
    return {
      // validation rules
      nick: 'required|min:2|max:60',
      name: 'required|min:2|max:60',
      age: 'required|min:1|max:3',
      coutry: 'required|min:2|max:60',
			email: 'required|email',
      gender: 'required',
      height: 'required|min:2|max:20',
      weight: 'required|min:2|max:20',
      facebook: 'required|min:2|max:60',
      instagram: 'required|min:2|max:60',
      twitter: 'required|min:2|max:60',
      password: 'required|min:6|max:32|confirmed',
    }
  }
  get messages() {

    return {
        'nick.required'        	: 'Invalid Nick',
        'nick.min'             	: 'Nick must bigger than 2 character',
        'nick.max'             	: 'Nick must smaller than 60 character',
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

      return this.ctx.response.route('perfil', this.ctx.request.all())
  }
  
}

module.exports = UpdateProfile
