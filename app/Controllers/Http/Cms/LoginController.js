'use strict'

const Logger = use('Logger')

class LoginController {

    /*
    |
    | GET metodu için görüntülenecek.
    |
    */

    async index({ request, view, auth, session }) {

        /*
        | Kullanıcı daha önce giriş yapmış ise Logut işlemi tetikleniyor.
        | try: Oturum açmış kullanıcı varsa -> logout()
        */

        try {

            let status = await auth.authenticator('cms').check()

            if(status) {

                Logger.info('Logout ::', {
                    username: auth.authenticator('cms').user.username
                })

                await auth.authenticator('cms').logout()
            }
        }
        catch(error) {

            /* Hata durumunu yönetmeye gerek yok. */

            Logger.error('Session Not Found!')
        }

        return view.render('cms.pages.login');
    }

    /*
    |
    | POST metodu için görüntülenecek.
    | auth.authenticator('cms') => CMS için konfigure edilmiş auth middleware.
    |
    */

    async login({ request, view, auth, response, session }) {

        let { username, password } = request.all()

        try {

            /*
            | CMS authenticator kullanarak oturum açıyoruz.
            | Başarılı ise cms.dashboard route'a yönlendiriliyor.
            */

            Logger.info('Login User as ::', { username })

            await auth
                .authenticator('cms')
                .remember(true)
                .attempt(username, password)

            response.route('cms.dashboard');
            return

        }
        catch(error) {

            Logger.error('Login Failed ::', { username })

            /* Login işlemi başarısız. Session üzerinden hata döndür. */

            session
                .flash({
                    failed : 'Login failed, please check your username or password!',
                })
                .flashAll()

            session.commit()

            response.route('cms.login')
            return
        }
    }
}

module.exports = LoginController
