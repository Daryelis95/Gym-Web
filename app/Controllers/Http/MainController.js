'use strict'

const Logger = use('Logger')

class MainController {

    async index({ request, view }) {

        return view.render('pages/retos/retos')
    }
}

module.exports = MainController
