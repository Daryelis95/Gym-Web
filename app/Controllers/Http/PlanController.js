'use strict'

const Logger = use('Logger')
const Plan = use('App/Models/Planne')

class PlanController {

    async getplan(request) {

        let page = request.input('page', 1);

        let query = { deleted_at: null }

        if(request.input('keyword')) {
            query.title =  { $regex : request.input('keyword') }
        }

        return Plan
            .query()
            .where(query)
            .orderBy('_id','desc')
            .paginate(page)


    }

    async index({ request, view }) {
        
        let planes = await this.getplan(request);
        return view.render('pages/plannes/index',{
            planes : planes.toJSON(),
            headerImage : 'img/header-image-1.png'
        })
        
    }

    async list({ request, view }) {

        return view.render('pages/plannes/list')
    }

    async calendar({ request, view }) {
        
        return view.render('pages/plannes/calendar')
    }

    async planes({ request, view }) {

        let plans = await this.getplan(request);
        return view.render('pages/plannes/planes',{
            plans : plans.toJSON(),
            headerImage : 'img/header-image-1.png'
        })
        
        
    }

    async respaldo({ request, view }) {

        let respaldos = await this.getplan(request);
        return view.render('pages/plannes/respaldoindex',{
            respaldos : respaldos.toJSON()
        })
        
        
    }
}

module.exports = PlanController
