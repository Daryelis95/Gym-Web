'use strict'

const Nutricion         = use('App/Models/Cms/Nutricion')
const NutricionCategory = use('App/Models/Cms/NutricionCategory')
const Helpers           = use('Helpers')
const Menu = use('App/Models/Cms/Menu')
const MenuService = use('App/Utils/MenuService')

class NutricionController {

    //consulta DB
    async getmenus(request) {

        let page = request.input('page', 1);

        let query = { deleted_at: null }
       
        if(request.input('keyword')) {
            query.title =  { $regex : request.input('keyword') }
        }

        return Menu
            .query()
            .where(query)
            .orderBy('_id','desc')
            .paginate(page)


    }


    async index({view , request , params}){

        let notifications   = [];
        let edit = null;
        //eliminar
        if(params.method == 'delete') {

            try{

                await this.delete(params.id);
                notifications.push({
                    status      : true,
                    message     : 'Category has been deleted'
                })

            } catch{

                notifications.push({
                    status      : false,
                    message     : 'Category has not been deleted, please try again!'
                })

            }
        
        } //End:eliminar 
        else if(params.method=='edit') {
            edit = await Menu.find(params.id); //editar
        }


        let menus = await this.getmenus(request);

        return view.render('cms.pages.nutricions.crearmenu.index', {
            menus : menus.toJSON(),
            notifications   : notifications,
            edit: edit
        })
    }

    /*async index({ request, auth, view, params }) {

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

                edit = await Nutricion.find(params.id)
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

        let contents = await Nutricion
            .query()
            .where(query)
            .with('category')
            .paginate(page)


        let categories = await NutricionCategory
            .where({ deleted_at : null })
            .fetch()

        return view.render('cms.pages.nutricions.index', {
            contents        : contents.toJSON(),
            categories      : categories.toJSON(),
            notifications   : notifications,
            edit            : edit
        });
    }*/

    async crear({request, auth, view, params}){

        let edit = null;
        //Service
        const add = new MenuService();
        const menu = await add.create(request);

        if(menu) {

             notifications.push({
                 status      : true,
                 message     : 'New Menu has been added successfully'
             })
        }else{

            notifications.push({
                status      : false,
                message     : 'New Menu has not been added'
            })
            
        }

        let menus = await this.getmenus(request);
        return view.render('pages.nutricions.crearmenu.semana',{
            menus : menus.toJSON(),
            notifications:notifications,
            edit: edit 
        })
    }

}

module.exports = NutricionController
