'use strict'

const Rutina            = use('App/Models/Cms/Rutina')
const RutinaCategory    = use('App/Models/Cms/RutinaCategory')
const Helpers           = use('Helpers')
const Logger            = use('Logger')

class RutinaController {
    async index({ request, auth, view, params }) {

        let notifications   = [];
        let edit            = null;

        if(params.id) {

            if(params.method == 'delete') {

                if(await this.remove(params)) {

                    notifications.push({
                        status      : true,
                        message     : 'Content has been deleted'
                    })
                }
                else {

                    notifications.push({
                        status      : false,
                        message     : 'Content has not been deleted, please try again!'
                    })
                }
            }

            if(!params.method || params.method == 'edit') {

                edit = await Rutina.find(params.id)
            }
        }

        if(request.method().toLowerCase() == 'post') {

            if(!request.input('id')) {

                try {

                    await this.add(request)

                    notifications.push({
                        status      : true,
                        message     : 'New content has been added successfully'
                    })
                }
                catch(error) {

                    notifications.push({
                        status      : false,
                        message     : 'New content has not been added'
                    })
                }
            }
            else {

                try {

                    await this.update(request)

                    notifications.push({
                        status      : true,
                        message     : 'Content has been edited successfully'
                    })
                }
                catch(error) {

                    notifications.push({
                        status      : false,
                        message     : 'Conten has not been edited'
                    })
                }

            }
        }

        let page = request.input('page', 1);
        let query = { deleted_at: null }

        if(request.input('keyword')) {
            query.title =  { $regex : request.input('keyword') }
        }

        let contents = await Rutina
            .query()
            .where(query)
            .with('category')
            .paginate(page)


        let categories = await RutinaCategory
            .where({ deleted_at : null })
            .fetch()

        return view.render('cms.pages.rutinas.index', {
            contents        : contents.toJSON(),
            categories      : categories.toJSON(),
            notifications   : notifications,
            edit            : edit
        });
    }

    /*
    | Kayıt ekleme işlemi.
    */

    async add(request) {

        let body = request.only([
            'title',
            'content',
            'category_id',
            'description',
            'tags',
            'status',
            'types_of_diet',
            'dishes',
            'foods',
            'types_of_training',
            'youtube_link'
        ])

        if(request.file('file')) {

            let path = await this.storage(request)
            body.image = path
        }

        Logger.info('.add() ::', body)

        let content = new Rutina(body);
        return content.save()
    }

    /*
    | Kayıt güncelleme işlemi.
    */

    async update(request) {

        let update  = await Rutina.find(request.input('id'))
        let body = request.only([
            'title',
            'content',
            'category_id',
            'description',
            'tags',
            'status',
            'types_of_diet',
            'dishes',
            'foods',
            'types_of_training',
            'youtube_link'
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

        let content = await Rutina.find(params.id)
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
module.exports = RutinaController
