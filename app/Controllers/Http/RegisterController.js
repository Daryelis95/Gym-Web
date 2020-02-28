'use strict'

const User          = use('App/Models/User')
const Logger        = use('Logger')

class RegisterController {

    async index({ request, view, response, auth }) {

        let notifications = []

        if(request.method().toLowerCase() == 'post') {

            let body = request.only([
                'name',
                'surname',
                'password',
                'email',
                'gender'
            ])

            try {

                let user = new User(body);
                await user.save();

                await auth
                    .authenticator('session')
                    .remember(true)
                    .attempt(body.email, body.password)

                response.route('nutricions');
                return
            }
            catch(error) {

                notifications.push({
                    status      : false,
                    message     : 'User has not been added'
                })
            }
        }
        else {

            await auth.authenticator('session').logout()
        }

        return view.render('pages/register/register', {
            headerImage: 'img/header-image-empty.png',
            notifications: notifications
        })
    }

    async out({auth, response}) {
        await auth.authenticator('session').logout()
        response.redirect('/login')
    }
}

module.exports = RegisterController
