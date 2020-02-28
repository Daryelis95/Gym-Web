  'use strict'

const RecetaSubCategory = use('App/Models/Cms/RecetaSubCategory')
const Helpers           = use('Helpers')
const Logger            = use('Logger')

class RecetaSubCategoryController {

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

                edit = await RecetaSubCategory.find(params.id)
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
                        message     : 'Content has not been edited'
                    })
                }

            }
        }

        let page = request.input('page', 1);
        let query = { deleted_at: null, category_id: params.category_id }

        if(request.input('keyword')) {
            query.title =  { $regex : request.input('keyword') }
        }

        let contents = await RecetaSubCategory
            .query()
            .where(query)
            .paginate(page)

        return view.render('cms.pages.nutricions.receta-subcategories.index', {
            contents        : contents.toJSON(),
            notifications   : notifications,
            edit            : edit,
            params          : params
        });
    }

    /*
    | Kayıt ekleme işlemi.
    */

    async add(request) {

        let body = request.only([
            'title',
            'description',
            'icon',
            'tags',
            'status',
            'category_id'
        ])

        if(request.file('file')) {

            let path = await this.storage(request)
            body.image = path
        }

        Logger.info('RecetaSubCategory.add() ::', body)

        let content = new RecetaSubCategory(body);
        return content.save()
    }

    /*
    | Kayıt güncelleme işlemi.
    */

    async update(request) {

        let update = await RecetaSubCategory.find(request.input('id'))
        let body = request.only([
            'title',
            'description',
            'icon',
            'tags',
            'status'
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

        let content = await RecetaSubCategory.find(params.id)
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

module.exports = RecetaSubCategoryController
