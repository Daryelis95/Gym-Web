'use strict'

const User          = use('App/Models/User')
const Logger        = use('Logger')

class PerfilController {

    async index({view, auth, response}) {

        let user = await User.findBy('email', auth.user.email);

        const days = user.graphDay || [];
        const months = user.graphMonth || [];
        const weights = user.graphWeight || [];

        let options = []

        for (let index = 0; index < weights.length; index++) {
            options.push({message: `${months[index]}/${days[index]} - Peso: ${weights[index]}`, id: index})
        }

        try {
            await auth.check()
            return view.render('pages/perfil/area-privada-perfil/index', {
                hidden: true,
                options: options,
                medidas: user.medidas
            })
          } catch (error) {
            return response.redirect('/login')
        }
    }
}

module.exports = PerfilController
