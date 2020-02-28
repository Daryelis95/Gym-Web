'use strict'

const Logger = use('Logger')

class CalendarioController {

    async index({ request, view }) {

        return view.render('pages/calendarios/index')
    }

    async calendario({ vrequest , view }) {

        return view.render('pages/calendarios/calendario')
    }
}

module.exports = CalendarioController
