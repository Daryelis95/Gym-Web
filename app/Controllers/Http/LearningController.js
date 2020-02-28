'use strict'

const Learning = use('App/Models/Cms/Learning')
const Podcast  = use('App/Models/Podcast')
const Logger = use('Logger')

class LearningController {

    async index ({ request , view }) {

        

        let learnings = await this.getLearnings(request);

        return view.render('pages.learning.index', {
            learnings       : learnings.toJSON()
        });
    }

    async getLearnings(request) {

        let page = request.input('page', 1);

        let query = { deleted_at: null }

        if(request.input('keyword')) {
            query.title =  { $regex : request.input('keyword') }
        }

        return Learning
            .query()
            .where(query)
            .orderBy('_id','desc')
            .paginate(page)

    }



    async podcasts ({ request , view }) {

        let page = request.input('page', 1);

        let query = { deleted_at: null }

        if(request.input('keyword')) {
            query.title =  { $regex : request.input('keyword') }
        }

        let podcasts = await Podcast
                .query()
                .where(query)
                .orderBy('_id','desc')
               .paginate(page)

        return view.render('pages.learning.podcasts.index' ,{

            podcasts : podcasts.toJSON()
        })
    }



}

module.exports = LearningController
