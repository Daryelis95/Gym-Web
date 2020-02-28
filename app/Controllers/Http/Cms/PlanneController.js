'use strict'

const Planne            = use('App/Models/Cms/Planne')
const PlanneContent     = use('App/Models/Cms/PlanneContent')
const Receta            = use('App/Models/Cms/Receta')
const Helpers           = use('Helpers')
const Logger            = use('Logger')

class PlanneController {

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
                edit = await Planne.find(params.id)
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

        let contents = await Planne
            .query()
            .where(query)
            .paginate(page)

        return view.render('cms.pages.plannes.index', {
            contents        : contents.toJSON(),
            notifications   : notifications,
            edit            : edit,
        });
    }

    /*
    | Kayıt ekleme işlemi.
    */

    async add(request) {

        let body = request.only([
            'title',
            'price',
            'description',
            'tags',
            'status',
            'content'
        ])

        if(request.file('file')) {

            let path = await this.storage(request)
            body.image = path
        }

        Logger.info('Plannes.add() ::', body)

        let content = new Planne(body);
        return content.save()
    }

    /*
    | Kayıt güncelleme işlemi.
    */

    async update(request) {

        let update  = await Planne.find(request.input('id'))
        let body = request.only([
            'title',
            'price',
            'description',
            'tags',
            'status',
            'content'
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

        let content = await Planne.find(params.id)
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

    async contents({ request, auth, view, params }) {

        let notifications   = [];
        let edit            = null;

        if(params.id) {

            if(params.method == 'delete') {

                if(await this.removeContent(params)) {

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
                edit = await PlanneContent.find(params.id)
            }
        }

        if(request.method().toLowerCase() == 'post') {

            if(!request.input('id')) {

                try {

                    await this.addContent(request)

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

                    await this.updateContent(request)

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
        let query = { deleted_at: null, planne_id: params.plan_id }

        let contents = await PlanneContent
            .query()
            .where(query)
            .with('content')
            .paginate(page)

        let options = await Receta
            .where({ deleted_at: null })
            .fetch()

        return view.render('cms.pages.plannes.contents.index', {
            contents        : contents.toJSON(),
            notifications   : notifications,
            edit            : edit,
            params          : params,
            options         : options.toJSON()
        });
    }

    async addContent(request) {

        let body = request.only([
            'planne_id',
            'content_id',
            'content_type',
            'status'
        ])

        if(request.file('file')) {

            let path = await this.storage(request)
            body.image = path
        }

        Logger.info('Planne.addContent() ::', body)

        let content = new PlanneContent(body);
        return content.save()
    }

    async updateContent(request) {

        let update  = await PlanneContent.find(request.input('id'))
        let body = request.only([
            'content_id',
            'content_type',
            'status'
        ])

        if(request.file('file')) {

            let path = await this.storage(request)
            body.image = path
        }

        update.merge(body)

        return update.save()
    }

    async removeContent(params) {

        let content = await PlanneContent.find(params.id)
        return content ? content.delete() : content
    }
}

module.exports = PlanneController
