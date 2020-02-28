'use strict'

const Receta            = use('App/Models/Cms/Receta')
const RecetaCategory    = use('App/Models/Cms/RecetaCategory')
const Planne            = use('App/Models/Cms/Planne')
const Helpers           = use('Helpers')
const Logger            = use('Logger')

class RecetaController {

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
                edit = await Receta.find(params.id)
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

        let contents = await Receta
            .query()
            .where(query)
            .with('category')
            .paginate(page)

        let categories = await RecetaCategory
            .where({ deleted_at : null })
            .fetch()

        let options = [
            {
                name    : 'types_of_diet',
                title   : 'Types Of Diet',
                options : [
                    { name: 'types_of_diet', text: 'Basic',        value: 'basic' },
                    { name: 'types_of_diet', text: 'Vegetarian',   value: 'vegetarian' },
                    { name: 'types_of_diet', text: 'Vegan',        value: 'vegan' }
                ]
            },
            {
                name    : 'platos',
                title   : 'Platos',
                options : [
                    { name: 'platos', text: 'Entranos',             value: 'entranos' },
                    { name: 'platos', text: 'Psoters',              value: 'vegetarian' },
                    { name: 'platos', text: 'Accopamentiano',       value: 'accopamentiano' },
                    { name: 'platos', text: 'Plato Principials',    value: 'plato_principials' }
                ]
            },
            {
                name    : 'comidas',
                title   : 'Comidas',
                options : [
                    { name: 'comidas', text: 'Desayuno',   value: 'desayuno' },
                    { name: 'comidas', text: 'Comida',     value: 'comida' },
                    { name: 'comidas', text: 'Cena',       value: 'cena' },
                    { name: 'comidas', text: 'Tentepemia', value: 'tentepemia' }
                ]
            },
            {
                name    : 'entertamiento',
                title   : 'Top Die Entertamiento',
                options : [
                    { name: 'entertamiento', text: 'Desayuno',   value: 'desayuno' },
                    { name: 'entertamiento', text: 'Comida',     value: 'comida' },
                    { name: 'entertamiento', text: 'Cena',       value: 'cena' },
                    { name: 'entertamiento', text: 'Tentepemia', value: 'tentepemia' },
                    { name: 'entertamiento', text: 'Desayuno',   value: 'desayuno' },
                    { name: 'entertamiento', text: 'Comida',     value: 'comida' },
                    { name: 'entertamiento', text: 'Cena',       value: 'cena' },
                    { name: 'entertamiento', text: 'Tentepemia', value: 'tentepemia' }
                ]
            }
        ]

        return view.render('cms.pages.nutricions.recetas.index', {
            contents        : contents.toJSON(),
            categories      : categories.toJSON(),
            notifications   : notifications,
            edit            : edit,
            options         : options
        });
    }

    /*
    | Kayıt ekleme işlemi.
    */

    async add(request) {

        let body = request.only([
            'title',
            'preparation',
            'tips',
            'fact',
            'time',
            'difficult',
            'serving',
            'category_id',
            'description',
            'tags',
            'status',
            'types_of_diet',
            'platos',
            'comidas',
            'entertamiento',
            'youtube_link'
        ])

        if(request.file('file')) {

            let path = await this.storage(request)
            body.image = path
        }

        Logger.info('Recetas.add() ::', body)

        let content = new Receta(body);
        return content.save()
    }

    /*
    | Kayıt güncelleme işlemi.
    */

    async update(request) {

        let update  = await Receta.find(request.input('id'))
        let body = request.only([
            'title',
            'preparation',
            'tips',
            'fact',
            'time',
            'difficult',
            'serving',
            'category_id',
            'description',
            'tags',
            'status',
            'types_of_diet',
            'platos',
            'comidas',
            'entertamiento',
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

        let content = await Receta.find(params.id)
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

module.exports = RecetaController
