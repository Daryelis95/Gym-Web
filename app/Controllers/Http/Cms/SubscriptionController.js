'use strict'

const Subscription          = use('App/Models/Cms/Subscription')
const SubscriptionPlanne    = use('App/Models/Cms/SubscriptionPlanne')
const Planne                = use('App/Models/Cms/Planne')
const Helpers               = use('Helpers')
const Logger                = use('Logger')

class SubscriptionController {

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
                edit = await Subscription.find(params.id)
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

        let contents = await Subscription
            .query()
            .where(query)
            .paginate(page)

        return view.render('cms.pages.subscriptions.index', {
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
            'content',
            'type'
        ])

        if(request.file('file')) {

            let path = await this.storage(request)
            body.image = path
        }

        Logger.info('Subscription.add() ::', body)

        let content = new Subscription(body);
        return content.save()
    }

    async update(request) {

        let update  = await Subscription.find(request.input('id'))
        let body = request.only([
            'title',
            'price',
            'description',
            'tags',
            'status',
            'content',
            'type'
        ])

        if(request.file('file')) {

            let path = await this.storage(request)
            body.image = path
        }

        update.merge(body)

        return update.save()
    }

    async remove(params) {

        let content = await Subscription.find(params.id)
        return content ? content.delete() : content
    }

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

    async plannes({ request, auth, view, params }) {

        let notifications   = [];
        let edit            = null;

        if(params.id) {

            if(params.method == 'delete') {

                if(await this.removePlanne(params)) {

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
                edit = await SubscriptionPlanne.find(params.id)
            }
        }

        if(request.method().toLowerCase() == 'post') {

            if(!request.input('id')) {

                try {

                    await this.addPlanne(request)

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

                    await this.updatePlanne(request)

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
        let query = { subscription_id: params.subscription_id, deleted_at: null }

        if(request.input('keyword')) {
            query.title =  { $regex : request.input('keyword') }
        }

        let plannes = await Planne
            .where({ deleted_at : null })
            .fetch()

        let contents = await SubscriptionPlanne
            .query()
            .where(query)
            .with('planne')
            .paginate(page)

        return view.render('cms.pages.subscriptions.plannes.index', {
            contents        : contents.toJSON(),
            notifications   : notifications,
            edit            : edit,
            params          : params,
            plannes         : plannes.toJSON()
        });
    }

    async addPlanne(request) {

        let body = request.only([
            'subscription_id',
            'planne_id',
            'description',
            'status'
        ])

        if(request.file('file')) {

            let path = await this.storage(request)
            body.image = path
        }

        Logger.info('Subscription.addPlanne() ::', body)

        let content = new SubscriptionPlanne(body);
        return content.save()
    }

    async updatePlanne(request) {

        let update  = await SubscriptionPlanne.find(request.input('id'))
        let body = request.only([
            'subscription_id',
            'planne_id',
            'description',
            'status'
        ])

        if(request.file('file')) {

            let path = await this.storage(request)
            body.image = path
        }

        update.merge(body)

        return update.save()
    }

    async removePlanne(params) {

        let content = await SubscriptionPlanne.find(params.id)
        return content ? content.delete() : content
    }
}

module.exports = SubscriptionController
