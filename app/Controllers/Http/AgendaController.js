'use strict'

class AgendaController {
    async index({view, auth, response}) { 
        try {
            await auth.check()
            return view.render('pages/perfil/area-privada-agenda/index', {
                hidden: true
            })
          } catch (error) {
            return response.redirect('/login')
        }
    }

}

module.exports = AgendaController
