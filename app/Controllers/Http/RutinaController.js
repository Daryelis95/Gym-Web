'use strict'

const Logger = use('Logger')

class RutinaController {

    async detail({request, view}){

        return view.render('pages/rutinas/detail')
    }

    async full_width({request, view}){

        return view.render('pages/rutinas/full-width')
    }

    async rutina({request, view}){

        return view.render('pages/rutinas/rutina')
    }

    async full({request, view}){

        return view.render('pages/rutinas/full')
    }
}

module.exports = RutinaController
