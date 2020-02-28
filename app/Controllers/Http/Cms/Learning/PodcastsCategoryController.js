'use strict'

const PodcastsCategory    = use('App/Models/Cms/PodcastsCategory')
const Helpers           = use('Helpers')
const Logger            = use('Logger')


class PodcastsCategoryController {

    async index({ request, auth, view, params }) {

        let notifications   = [];
        let edit            = null;

        let podcasts = await this.getPodcasts({request})

        return view.render('cms.pages.learning.podcasts-categories.index', {
            podcasts        : podcasts.toJSON(),
            notifications   : notifications,
            edit            : edit
        });
    }

    async getPodcasts({request}){

        let page = request.input('page', 1);

        let query = { deleted_at: null }

        if(request.input('keyword')) {
            query.title =  { $regex : request.input('keyword') }
        }

        return PodcastsCategory
            .query()
            .where(query)
            .orderBy('_id','desc')
            .paginate(page)

    }

    /*
    | Kayıt ekleme işlemi.
    */

    async create (request, view) {

        let notifications   = [];

        let body = request.all()

       if(body.id){

          let podcast = await PodcastsCategory.find(body.id)
          //edit
          if(podcast){
              podcast.category = body.category;
              podcast.title = body.title;
              podcast.information = body.information;
              podcast.file = body.file;
              podcast.podcasts = body.podcasts;

              if(podcast.file == body.file){
                let path = await this.storage(request)
                body.file = path  
              }

              try{

                await podcast.save();

                notifications.push({
                    status : true ,
                    message: 'Category has been edited successfully'
                })
            
              }catch(error){

                notifications.push({
                    status      : false,
                    message     : 'Category has not been edited'
                })

              }

          }
       } //agregar
       else{
           let podcast = new podcast(body);
       }
    }

    /*
    | Kayıt güncelleme işlemi.
    */

    async update(request) {

        let update  = await PodcastsCategory.find(request.input('id'))
        let body = request.only([
            'title',
            'description',
            'icon',
            'tags',
            'status',
            'type'
        ])

        if(request.file('file')) {

            let path = await this.storage(request)
            body.image = path
        }

        update.merge(body)

        return update.save()
    }

    /*
    | Kayıt silme işlemi.
    */

    async remove(params) {

        let content = await PodcastsCategory.find(params.id)
        return content ? content.delete() : content
    }

    /*
    | Upload işlemi.
    */

    async storage(request) {

        const file = request.file('file', {
            types   : [ 'image' ],
            size    : '4mb'
        })

        let name    = file.clientName
        let ext     = name.split('.')[1]

        name        = new Date().getTime() + ext

        await file.move('public/uploads', {
            name: name
        })

        if(!file.moved()) {
            return file.error()
        }

        return name
    }
}

module.exports = PodcastsCategoryController