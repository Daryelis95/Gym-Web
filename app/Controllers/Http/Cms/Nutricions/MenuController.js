'use strict'

const UtilsService = use('App/Utils/UtilsService')
const Menu = use('App/Models/Cms/Menu')


class MenuController {

    /*+++++++++++++++CREAR MENU +++++++++*/
    async gett(request){
        
        let page        = request.input('page', 1);
        let query       = { deleted_at: null } 

        if(request.input('keyword')) {
            query.title =  { $regex : request.input('keyword') }
        }

        return Menu
            .query()
            .where(query)
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


        let menus = await this.gett(request);

        return view.render('pages.nutricions.crearmenu.index', {
            menus : menus.toJSON(),
            notifications   : notifications,
            edit: edit,
            headerImage : 'img/header-image-4.png'
        })
            
        
    }
    //agrega and editar
    async createMenu({request, auth, view, params, response}){
       
        let notifications = [];
        
        let edit = null;
      
        let body = request.all();
        
        /*for(let i in lobbies.rows) {
            const lobby = body.rows[i]
            console.log(lobby.title) // you should be able to have access to name now
        }*/
        if(body.id) {

         let menu = await Menu.find(body.id);
            if(menu) {
               menu.title = body.title;
               menu.descripcion = body.descripcion;
               menu.desayuno = body.desayuno;
               menu.mediamanana = body.mediamanana;
               menu.comida = body.comida;
               menu.mediatarde = body.mediatarde;
               menu.cena = body.cena;
               menu.dia = body.dia;
               menu.semana = body.semana;
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
            let menu = new Menu(body);
        
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
               
                    response.sendView('welcome')
                
                 } catch(error) {
    
                    notifications.push({
                        status      : false,
                        message     : 'New Menu has not been added'
                    })
                }
                 
        }

        let menus = await this.gett(request);
        return view.render('pages/nutricions/crearmenu/index',{
            menus : menus.toJSON(),
            notifications:notifications,
            edit: edit

        })
    }

    async delete(id) {
    
        let menu = await Menu.find(id)
    
        return menu ? menu.delete() : menu
   }

    /*+++++++++++++++ RECETA+++++++++*/
    async recetas({request, auth, view, params, response}){

        let notifications   = [];
        let edit = null;

        let recetas = await this.gett(request);

        return view.render('pages.nutricions.recetas.index',{
            recetas      : recetas.toJSON(),
            notifications:notifications
        })
    }
}
module.exports = MenuController