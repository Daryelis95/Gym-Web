'use strict'

const Nutricion     = use('App/Models/Nutricion')
const Logger        = use('Logger')

class RetoController {

    async index({ request, view }) {

        return view.render('pages/retos/retos')
    }
}

module.exports = RetoController
