'use strict'

const Menu = use('App/Models/Cms/Menu')
const UtilsService = use('App/Utils/UtilsService')



class CrearMenuController {

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
    //consulta DB
    async getmenus(request,params) {

        let page = request.input('page', 1);

        let query = { deleted_at: null }
        
        //let lt= request.all();
        //let men= await Menu.find(lt.id);
       
        if(request.input('keyword')) {
            query.title =  { $regex : request.input('keyword') }
        }

        return Menu
            .query()
            .where(query)
            .orderBy('_id','desc')
            .paginate(page)


    }
    //agrega and editar
    async create({request, auth, view, params}){
        let notifications = [];
        
        let edit = null;
      
        let body = request.all();
        
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
    
                
                 } catch(error) {
    
                    notifications.push({
                        status      : false,
                        message     : 'New Menu has not been added'
                       
                    })
                }
                 
        }

        let menus = await this.getmenus(request);
        return view.render('cms.pages.nutricions.crearmenu.index',{
            menus : menus.toJSON(),
            notifications:notifications,
            edit: edit            

        })
    }

    //Eliminar
    async delete(id) {
        let menu = await Menu.find(id)
        return menu ? menu.delete() : menu
    }

    //EDITAR TEST
    async edita({view , request , params}) {

        let notifications   = [];
        
        //editar
        if(params.method == 'editar') {


            try{

                await this.editar(params.id);
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
        
        } //agregar
        else {
            let menu = new Menu(body);
            
            try{
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

        return view.render('cms.pages.nutricions.recetas.index', {
            menus : menus.toJSON(),
            notifications   : notifications,
            editar: editar
        })
        
        
    }

    async editar(id){

        let editar = await Menu.find(id).first()
        return editar ? menu.editar : menu
    }


}

module.exports = CrearMenuController
