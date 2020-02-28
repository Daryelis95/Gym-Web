'use strict'

const Logger = use('Logger')

class AprendizajeController {

    async index ({ request , view }) {

        return view.render('pages/aprendizajes/index')
    }

    async aprendizaje({ request, view }) {

        return view.render('pages/aprendizajes/aprendizaje')
    }
}

module.exports = AprendizajeController
