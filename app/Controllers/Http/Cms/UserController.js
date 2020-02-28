'use strict'

const User      = use('App/Models/User')
const Logger    = use('Logger')

class UserController {

    async index({ request, auth, view, params }) {

        let notifications   = [];
        let edit            = null;

        if(params.id) {

            if(params.method == 'delete') {

                if(await this.removeUser(params)) {

                    notifications.push({
                        status      : true,
                        message     : 'User has been deleted'
                    })
                }
                else {

                    notifications.push({
                        status      : false,
                        message     : 'User has not been deleted, please try again!'
                    })
                }
            }

            if(!params.method || params.method == 'edit') {

                edit = await User.find(params.id)
            }
        }

        if(request.method().toLowerCase() == 'post') {

            if(!request.input('id')) {

            }
            else {

                let update  = await User.find(request.input('id'))
                let body    = request.only([
                    'gender',
                    'password',
                    'email',
                    'name',
                    'surname'
                ]);

                if(!body.password || body.password == null)
                    delete body.password

                update.merge(body)

                try {

                    await update.save()

                    notifications.push({
                        status      : true,
                        message     : 'User has been edited successfully'
                    })
                }
                catch(error) {

                    notifications.push({
                        status      : false,
                        message     : 'User has not been edited'
                    })
                }

            }
        }

        let page = request.input('page', 1);
        let query = { deleted_at: null }

        if(request.input('keyword')) {
            query.name = { $regex : request.input('keyword') }
            query.surname = { $regex : request.input('keyword') }
        }

        let users  = await User
            .query()
            .where(query)
            .paginate(page)

        return view.render('cms.pages.users.index', {
            users           : users.toJSON(),
            notifications   : notifications,
            edit            : edit
        });
    }

    async removeUser(params) {

        let user = await User.find(params.id)

        return user ? user.delete() : user
    }
}

module.exports = UserController
