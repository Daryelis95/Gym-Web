'use strict'

const Admin     = use('App/Models/Cms/Admin')
const Logger    = use('Logger')

class DashboardController {

    async index({ request, auth, view, params }) {
        console.log(params)

        let notifications   = [];
        let edit            = null;

        /**
        | Params :id ve :method parametreleri tanımlanmış ise.
        | :method = delete -> Kayıt silme işlemi için kullanılıyor.
        */

        if(params.id) {

            /* Kayıt silme işlemi. */

            if(params.method == 'delete') {

                if(await this.removeUser(params)) {

                    /* Kayıt silindi. */

                    notifications.push({
                        status      : true,
                        message     : 'User has been deleted'
                    })
                }
                else {

                    /* Kayıt silme işleminde hata ile karşılaşıldı. */

                    notifications.push({
                        status      : false,
                        message     : 'User has not been deleted, please try again!'
                    })
                }
            }

            /* Düzenleme içi kayıt getirme işlemi. */

            if(!params.method || params.method == 'edit') {

                edit = await Admin.find(params.id)
            }
        }

        /**
        | POST isteiği gönderdildiğinde CREATE/UPDATE işlemleri yapılacak.
        | _id deiğişkeni varsa güncelleme işlemi yapılacaktır.
        */

        if(request.method().toLowerCase() == 'post') {

            if(!request.input('id')) {

                /** !_id :: Kullanıcı ekleme işlemi yapılıyor. */

                await this.addUser(request)

                notifications.push({
                    status      : true,
                    message     : 'New user has been added successfully'
                })
            }
            else {

                /* Güncellenecek kayıt alınıyor. */

                let update  = await Admin.find(request.input('id'))
                let body    = request.only([
                    'roles',
                    'password'
                ]);

                if(!body.password || body.password == null)
                    delete body.password

                update.merge(body)

                try {

                    /* Güncelleme işlemi yapılıyor. */

                    await update.save()

                    notifications.push({
                        status      : true,
                        message     : 'User has been edited successfully'
                    })
                }
                catch(error) {

                    /* Güncelleme işlemi sırasında hata ile karşılaşıldı. */

                    notifications.push({
                        status      : false,
                        message     : 'User has not been edited'
                    })
                }

            }
        }

        /**
        | Liste sayfalama için GET (page) parametresi kullanılıyor.
        */

        let page = request.input('page', 1);

        /**
        | Admin listesi paginate edilerek çekiliyor.
        | Admin.all()
        */

        let query = { deleted_at: null }

        if(request.input('keyword')) {
            query.username =  { $regex : request.input('keyword') }
        }

        let admins  = await Admin
            .query()
            .where(query)
            .paginate(page)

        /*
        | admins -> Admin listesi içeriği. (Paginate edilimiş)
        | notifications -> Uyarı mesajları listesi.
        */

        return view.render('cms.pages.dashboard.index', {
            admins          : admins.toJSON(),
            notifications   : notifications,
            edit            : edit
        });
    }

    /*
    | Kullanıcı ekleme işlemi.
    */

    async addUser(request) {

        let body = request.only([
            'username',
            'password',
            'roles'
        ])

        Logger.info('.addUser() ::', body)

        let admin = new Admin(body);

        return admin.save()
    }

    /*
    | Kullanıcı silme işlemi.
    */

    async removeUser(params) {

        let admin = await Admin.find(params.id)

        return admin ? admin.delete() : admin
    }
}

module.exports = DashboardController
