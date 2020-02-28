'use strict'

const Receta            = use('App/Models/Receta')
const CrearMenu         = use('App/Models/CrearMenu')
const Categoria          = use('App/Models/Cms/Categoria')
const RecetaCategory    = use('App/Models/RecetaCategory')
const User              = use('App/Models/User')
const Like              = use('App/Models/Like');
const UserClearMenu     = use('App/Models/UserClearMenu');
const ClearMenuContent  = use('App/Models/ClearMenuContent');
const Logger            = use('Logger')
const $$                = require('lodash')

const options = {
    platos: [
        { name: 'platos', text: 'Entranos',             value: 'entranos' },
        { name: 'platos', text: 'Psoters',              value: 'vegetarian' },
        { name: 'platos', text: 'Accopamentiano',       value: 'accopamentiano' },
        { name: 'platos', text: 'Plato Principials',    value: 'plato_principials' }
    ],
    types_of_diet: [
        { name: 'types_of_diet', text: 'Basic',        value: 'basic' },
        { name: 'types_of_diet', text: 'Vegetarian',   value: 'vegetarian' },
        { name: 'types_of_diet', text: 'Vegan',        value: 'vegan' }
    ],
    comidas: [
        { name: 'comidas', text: 'Desayuno',   value: 'desayuno' },
        { name: 'comidas', text: 'Comida',     value: 'comida' },
        { name: 'comidas', text: 'Cena',       value: 'cena' },
        { name: 'comidas', text: 'Tentepemia', value: 'tentepemia' }
    ],
    entertamiento: [
        { name: 'entertamiento', text: 'Desayuno',   value: 'desayuno' },
        { name: 'entertamiento', text: 'Comida',     value: 'comida' },
        { name: 'entertamiento', text: 'Cena',       value: 'cena' },
        { name: 'entertamiento', text: 'Tentepemia', value: 'tentepemia' },
        { name: 'entertamiento', text: 'Desayuno',   value: 'desayuno' },
        { name: 'entertamiento', text: 'Comida',     value: 'comida' },
        { name: 'entertamiento', text: 'Cena',       value: 'cena' },
        { name: 'entertamiento', text: 'Tentepemia', value: 'tentepemia' },
        { name: 'entertamiento', text: 'Comida',     value: 'comida' },
        { name: 'entertamiento', text: 'Cena',       value: 'cena' },
        { name: 'entertamiento', text: 'Tentepemia', value: 'tentepemia' }
    ]
};

class NutricionPController {

   

    async recetas({ request, view, params, auth }) {

        let page = request.input('page', 1);
        let query = { deleted_at: null }

        if(params.category || params.category != 'all') {

            let category = await RecetaCategory.findBy('slug', params.category)

            if(category) {
                query.category_id = category._id
            }
        }

        if(request.input('keyword')) {
            query.title =  { $regex : request.input('keyword') }
        }

        let opts = ['types_of_diet', 'platos', 'entertamiento', 'comidas'];

        let recetas = Receta
            .query()
            .where(query)

        for(let index in opts) {

            if(request.input(opts[index])) {
                recetas.whereIn(opts[index], [].concat(request.input(opts[index])));
            }
        }

        if(auth) {

            try {

                let user = await auth
                    .authenticator('session')
                    .getUser();

                recetas.with('like', (builder ) => {
                    builder
                        .where('content_type', 'receta')
                        .where('user_id', user._id)
                })
            }
            catch(error) {

            }
        }

        let contents = await recetas
            .with('category')
            .paginate(page)

        let categories = await RecetaCategory
            .where({ deleted_at : null })
            .fetch()

        return view.render('pages/nutricions/recetas/recetas', {
            categories  : categories.toJSON(),
            contents    : contents.toJSON(),
            options     : options,
            headerImage : 'img/header-image-3.png'
        })
    }

    async recetaDetail({ request, view, params, auth }) {

        let user = null;
        let detail = Receta
            .where({ slug: params.slug })
            .with('ingredients')

        if(auth) {

            try {

                user = await auth
                    .authenticator('session')
                    .getUser();

                detail.with('like', (builder ) => {
                    builder
                        .where('content_type', 'receta')
                        .where('user_id', user._id)
                })
            }
            catch(error) {

            }
        }

        detail.limit(1)

        detail = await detail.fetch()
        detail = detail.toJSON()[0];

        if(auth && detail && request.input('like')) {

            if(request.input('like') == 'true') {

                let add = new Like({
                    content_id      : detail._id,
                    user_id         : user._id,
                    content_type    : 'receta'
                })

                detail.like = await add.save()
            }
            else {

                if(detail.like) {

                    let remove = await Like.find(detail.like._id)
                    await remove.delete()
                    detail.like = null;
                }
            }
        }

        let prv = await Receta
            .where({ _id: { $lt: detail._id }})
            .sort({ _id: -1 })
            .limit(1)
            .fetch()

        prv = prv.toJSON()[0];

        let nxt = await Receta
            .where({ _id: { $gt: detail._id }})
            .sort({ _id: 1 })
            .limit(1)
            .fetch()

        nxt = nxt.toJSON()[0];

        return view.render('pages/recetas/receta-detail', {
            receta          : detail,
            nextSlug        : (!nxt) ? null : nxt.slug,
            previousSlug    : (!prv) ? null : prv.slug,
            headerImage     : 'img/header-image-3.png'
        })
    }
    /*+++++++++++++++CREAR MENU +++++++++*/
    async getMenu(request){

        let page        = request.input('page', 1);
        let query       = { deleted_at: null } 

        if(request.input('keyword')) {
            query.title =  { $regex : request.input('keyword') }
        }

        return Categoria
            .query()
            .where(query)
            .orderBy('_id','desc')
            .paginate(page)
    }

    async crearMenu({request, view, params, auth, response }){

        let crearmenus = await this.getMenu(request);

        return view.render('pages/nutricions/crearmenu/index', {
            crearmenus    : crearmenus,
            headerImage : 'img/header-image-4.png'
        })
    }

    async createMenu({request, view, params, auth, response }){

        let notifications = [];
        let edit = null;

        let body = request.all();

         
        if(body.id) {
            let menu = await CrearMenu.find(body.id);
               if(menu) {
                  menu.title = body.title;
                  menu.desayuno = body.desayuno;
                  menu.mediamanana = body.mediamanana;
                  menu.almuerzo = body.almuerzo;
                  menu.mediatarde = body.mediatarde;
                  menu.cena = body.cena;
                  menu.mes = body.mes;
                  menu.semana = body.semana;
                  menu.fecha = body.fecha;
                  menu.status = body.status;
   
                 try {
                    await menu.save();
                    notifications.push({
                    status      : true,
                    message     : 'Menu has been edited successfully'
                   })
                  }
                   catch(error) {
       
                       notifications.push({
                       status      : false,
                       message     : 'Menu has not been edited'
                      })
                    }
       
                       
           }
           } 
           else {
               let menu = new CrearMenu(body);
           
               try {
   
                   await menu.save();
       
                    notifications.push({
                        status      : true,
                        message     : 'New Menu has been added successfully'
                       })
       
                   
                    } catch(error) {
       
                       notifications.push({
                           status      : false,
                           message     : 'New Menu has not been added'
                       })
                   }
                    
           }
   
           let menus = await this.getMenu(request);
           return view.render('pages/nutricions/crearmenu/index',{
               menus : menus.toJSON(),
               notifications:notifications,
               edit: edit
   
           })

    }

   /*++++++++++++++++++++++++++++++++++++++++++++++++++++*/

    async crearMenuDetail({request, view, params, auth }){

        let page = request.input('page', 1)
        let query = { deleted_at: null } 

        if(request.input('keyword')) {
            query.title =  { $regex : request.input('keyword') }
        }

        let crearmenudetail = await ClearMenuContent
                    .query()
                    .where(query)
                    .where('user_id', user._id)
                    .where('day', params.day)
                    .where('menu_id', params.menu_id)
                    .with('receta')
                    .fetch()
                    .paginate(page)

        return view.render('pages/nutricions/crearmenu/crearmenu-detail', {
            crearmenudetail: crearmenudetail.toJSON(),
            meals       : meals,
            menu        : menu,
            recetas     : recetas,
            headerImage : 'img/header-image-4.png',
            params      : params
        })
    }

    async clearMenu({ request, view, params, auth, response }) {

        let page        = request.input('page', 1);
        let query       = { deleted_at: null }
        let contents    = { data: [] };

        if(auth) {

            try {

                let user = await auth
                    .authenticator('session')
                    .getUser();

                if(request.method().toLowerCase() == 'post') {

                    let body = request.only([
                        'title',
                        'user_id'
                    ])

                    body.user_id = user._id

                    let doc = new UserClearMenu(body);
                    await doc.save()

                    response.route('nutricions.crearmenu.detail', {
                        menu_id : doc._id.toString(),
                        day: 1
                    })
                }

                contents = await UserClearMenu
                    .query()
                    .where(query)
                    .where('user_id', user._id)
                    .paginate(page)

                contents = contents.toJSON()

            }
            catch(error) {
                Logger.error(error)
            }
        }

        return view.render('pages/nutricions/crearmenu/index', {
            contents    : contents,
            headerImage : 'img/header-image-4.png'
        })
    }

    async clearMenuDetail({ request, view, params, auth }) {

        let page        = request.input('page', 1)
        let query       = { deleted_at: null }
        let content     = { data: [] }
        let menu        = null
        let recetas     = null
        let meals       = {};

        params.day = params.day ? params.day : 1;

        if(auth) {

            try {

                let user = await auth
                    .authenticator('session')
                    .getUser();

                if(request.method().toLowerCase() == 'post') {

                    if(request.input('proccess') == 'edit-menu') {

                        let update = await UserClearMenu.find(params.menu_id);

                        update.merge({ title: request.input('title') })
                        await update.save()
                    }
                    else {

                        if(request.input('content_id')) {

                            let doc = await ClearMenuContent.find(request.input('content_id'))

                            doc.merge({ receta_id: request.input('receta_id') })
                            await doc.save()
                        }
                        else {

                            let body = request.only([
                                'receta_id',
                                'meal'
                            ])

                            body.user_id    = user._id
                            body.menu_id    = params.menu_id;
                            body.day        = params.day;

                            let doc = new ClearMenuContent(body)
                            await doc.save()
                        }
                    }
                }
                else {

                    if(request.input('delete')) {

                        let del = await ClearMenuContent.find(request.input('delete'))

                        if(del) {
                            await del.delete()
                        }

                    }
                }

                content = await ClearMenuContent
                    .query()
                    .where(query)
                    .where('user_id', user._id)
                    .where('day', params.day)
                    .where('menu_id', params.menu_id)
                    .with('receta')
                    .fetch()

                content = content.toJSON()

                for(let index in content) {

                    let m = content[index].meal

                    if(!meals[m]) {
                        meals[m] = content[index]
                    }
                }

                menu    = await UserClearMenu.find(params.menu_id)
                recetas = await Receta.query({ deleted_at: null }).fetch()

                recetas = recetas.toJSON()
            }
            catch(error) {
                Logger.error(error)
            }
        }

        return view.render('pages/personaliza/clearmenu/clearmenu-detail', {
            meals       : meals,
            menu        : menu,
            recetas     : recetas,
            headerImage : 'img/header-image-4.png',
            params      : params
        })
    }

    async clearMenuCalendar({ request, view, params, auth }) {

        let page        = request.input('page', 1)
        let query       = { deleted_at: null }
        let content     = { data: [] }
        let menu        = null
        let recetas     = null
        let meals       = {};

        params.day = params.day ? params.day : 1;

        if(auth) {

            try {

                let user = await auth
                    .authenticator('session')
                    .getUser();

                if(request.method().toLowerCase() == 'post') {

                    if(request.input('proccess') == 'edit-menu') {

                        let update = await UserClearMenu.find(params.menu_id);

                        update.merge({ title: request.input('title') })
                        await update.save()
                    }
                    else {

                        let body = request.only([
                            'receta_id',
                            'meal',
                            'day'
                        ])


                        body.user_id    = user._id
                        body.menu_id    = params.menu_id;

                        let doc = new ClearMenuContent(body)
                        await doc.save()
                    }
                }
                else {

                    if(request.input('delete')) {

                        let del = await ClearMenuContent.find(request.input('delete'))

                        if(del) {
                            await del.delete()
                        }

                    }
                }

                content = await ClearMenuContent
                    .query()
                    .where(query)
                    .where('user_id', user._id)
                    .where('menu_id', params.menu_id)
                    .with('receta')
                    .fetch()

                content = content.toJSON()

                let days = $$.groupBy(content, 'day')

                meals = $$.mapValues(days, d => {
                    return $$.mapValues($$.groupBy(d, 'meal'), ml => ml[0])
                })

                menu    = await UserClearMenu.find(params.menu_id)
                recetas = await Receta.query({ deleted_at: null }).fetch()

                recetas = recetas.toJSON()
            }
            catch(error) {
                Logger.error(error)
            }
        }

        return view.render('pages/personaliza/clearmenu/clearmenu-calendar', {
            meals       : meals,
            menu        : menu,
            recetas     : recetas,
            headerImage : 'img/header-image-4.png',
            params      : params,
            days        : [ 1,2,3,4,5,6,7 ],
            rows        : [
                {
                    id      : 'desayuno',
                    title   : 'DESAYUNO'
                },
                {
                    id      : 'mediamanana',
                    title   : 'MEDIA MANANA'
                },
                {
                    id      : 'almuerzo',
                    title   : 'AL MUERZO'
                },
                {
                    id      : 'mediatarde',
                    title   : 'MEDIA TARDE'
                },
                {
                    id      : 'cena',
                    title   : 'CENA'
                }
            ]
        })
    }
}


module.exports = NutricionPController
