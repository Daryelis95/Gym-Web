'use strict'

const RecetaImage       = use('App/Models/Cms/RecetaImage')
const Helpers           = use('Helpers')
const Logger            = use('Logger')

class RecetaImageController {

    async index({ request, auth, view, params }) {

        let notifications   = [];
        let edit            = null;

        if(params.id) {

            if(params.method == 'delete') {

                if(await this.remove(params)) {

                    notifications.push({
                        status      : true,
                        message     : 'Image has been deleted'
                    })
                }
                else {

                    notifications.push({
                        status      : false,
                        message     : 'Image has not been deleted, please try again!'
                    })
                }
            }
        }

        if(request.method().toLowerCase() == 'post') {

            try {

                await this.add(request)

                notifications.push({
                    status      : true,
                    message     : 'Image has been added successfully'
                })
            }
            catch(error) {

                notifications.push({
                    status      : false,
                    message     : 'Image has not been added'
                })
            }
        }

        let page = request.input('page', 1);
        let query = { deleted_at: null, receta_id: params.receta_id }

        let contents = await RecetaImage
            .query()
            .where(query)
            .paginate(page)

        return view.render('cms.pages.nutricions.receta-images.index', {
            contents        : contents.toJSON(),
            notifications   : notifications,
            params          : params
        });
    }

    /*
    | Kayıt ekleme işlemi.
    */

    async add(request) {

        let body = request.only([
            'title',
            'status',
            'receta_id'
        ])

        if(request.file('file')) {

            let path = await this.storage(request)
            body.image = path
        }

        Logger.info('RecetaImage.add() ::', body)

        let content = new RecetaImage(body);
        return content.save()
    }

    /*
    | Kayıt silme işlemi.
    */

    async remove(params) {

        let content = await RecetaImage.find(params.id)
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

module.exports = RecetaImageController
