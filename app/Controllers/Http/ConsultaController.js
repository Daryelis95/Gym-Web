'use strict'

const Logger = use('Logger')

class ConsultaController {

    async index({request, view}) {

        return view.render('pages/consultas/index')
    }

    async area_privada({request, view}) {

        return view.render('pages/consultas/area-privada')
    }

    async personalizada({request, view}) {

        return view.render('pages/consultas/personalizada')
    }
}

module.exports = ConsultaController
