'use strict'

const CrearMenu         = use('App/Models/Cms/Menu')
const Categoria          = use('App/Models/Cms/Categoria')
const Receta            = use('App/Models/Receta')
const RecetaCategory    = use('App/Models/RecetaCategory')

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

class NutricionController {

    /*+++++++++++++++CREAR MENU +++++++++*/
    async getMenu(request){
        
        let page        = request.input('page', 1);
        let query       = { deleted_at: null } 

        if(request.input('keyword')) {
            query.title =  { $regex : request.input('keyword') }
        }

        return CrearMenu
            .query()
            .where(query)
            .orderBy('_id','desc')
            .paginate(page)
    }

    async index({request, view, params, auth, response }){
        
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

        let page        = request.input('page', 1);
        let query       = { deleted_at: null } 

        if(request.input('keyword')) {
            query.title =  { $regex : request.input('keyword') }
        }

        let menus = await this.getMenu(request);

        return view.render('pages/nutricions/crearmenu/index', {
            menus    : menus.toJSON(),
            notifications : notifications,
            edit : edit ,
            headerImage : 'img/header-image-4.png'
        })
    }
    //agrega and editar
    async createMenu({request, auth, view, params}){
       
        let notifications = [];
        
        let edit = null;
      
        let body = request.all();
        
        if(body.id) {
         let menu = await CrearMenu.find(body.id);
            if(menu) {
               menu.title = body.title;
               menu.descripcion = body.descripcion;
               menu.desayuno = body.desayuno;
               menu.mediamanana = body.mediamanana;
               menu.comida = body.comida;
               menu.mediatarde = body.mediatarde;
               menu.cena = body.cena;
              // menu.fecha = body.fecha;
               //menu.mes = body.mes;
               menu.semana = body.semana;
               menu.dia = body.dia;
               
               //menu.status = body.status;
             //img
             const util = new UtilsService();
             const image = await util.uploadImage(request, '/menu');
             if(image) {
                menu.file = image;
                 notifications.push({
                     status      : true,
                     message     : 'Upload image successfully'
                 })
             }

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

                   //img
                   const util = new UtilsService();
                   const image = await util.uploadImage(request, '/menu');
                     if(image) {
                       menu.file = image;
                       notifications.push({
                         status      : true,
                         message     : 'Upload image successfully'
                      })
                    }
  

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

        let menus = await this.getmenus(request);
        return view.render('pages/nutricions/crearmenu/semana',{
            menus : menus.toJSON(),
            notifications:notifications,
            edit: edit

        })
    }

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

    return view.render('pages/nutricions/recetas/index', {
        categories  : categories.toJSON(),
        contents    : contents.toJSON(),
        options     : options,
        headerImage : 'img/header-image-3.png'
    })
   }

   async delete(id) {
    let menu = await Menu.find(id)
    return menu ? menu.delete() : menu
   }
}
module.exports = NutricionController