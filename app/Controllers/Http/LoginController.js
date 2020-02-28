'use strict'

const User          = use('App/Models/User')
const Logger        = use('Logger')

class LoginController {

    async index({ request, view, response, auth }) {
        
        try {

            let status = await auth.authenticator('session').check()

            if(status) {

                Logger.info('Logout ::', {
                    username: auth.authenticator('session').user.email
                })

                await auth.authenticator('session').logout()
            }
        }
        catch(error) {

            /* Hata durumunu yönetmeye gerek yok. */

            Logger.error('Session Not Found!')
        }

        return view.render('pages.login.login', {
            headerImage: 'img/header-image-empty.png'
        });
    }

    async login({ request, view, auth, response, session }) {

        let { email, password } = request.all()

        try {

            /*
            | CMS authenticator kullanarak oturum açıyoruz.
            | Başarılı ise cms.dashboard route'a yönlendiriliyor.
            */

            Logger.info('Login User as ::', { email })

            await auth
                .authenticator('session')
                .remember(true)
                .attempt(email, password)

            response.route('nutricions');
            return

        }
        catch(error) {

            Logger.error('Login Failed ::', { email })

            /* Login işlemi başarısız. Session üzerinden hata döndür. */

            session
                .flash({
                    failed : 'Login failed, please check your email or password!',
                })
                .flashAll()

            session.commit()

            response.route('login')
            return
        }
    }
}

module.exports = LoginController
