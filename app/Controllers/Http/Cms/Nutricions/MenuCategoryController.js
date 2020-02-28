'use strict'

const Categoria = use('App/Models/Cms/Categoria')
const Helpers = use('Helpers')
const UtilsService = use('App/Utils/UtilsService')

class MenuCategoryController {

    async index({view , request , params}){

        let notifications = [];
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
            edit = await Categoria.find(params.id); //editar
        }


        let categorias = await this.getmenucategory(request);

        return view.render('cms.pages.nutricions.menu-categories.index', {
            categorias : categorias.toJSON(),
            notifications :notifications,
            edit : edit
        })
    }

    async getmenucategory(request){

        let page = request.input('page' , 1);

        let query = { deleted_at: null }

        if(request.input('keyword')){
            query.title = {$regex : request.input('keyword')}
        }

        return Categoria 
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
         let categoria = await Categoria.find(body.id);
            if(categoria) {
                categoria.title = body.title;
                categoria.desayuno = body.desayuno;
                categoria.mediatarde = body.mediatarde;
                categoria.cena = body.cena;
                categoria.status = body.status;
                 //img
                 const util = new UtilsService();
                 const image = await util.uploadImage(request, '/menu');
                 if(image) {
                    categoria.file = image;
                     notifications.push({
                         status      : true,
                         message     : 'Upload image successfully'
                     })
                 }
 
                    
              try {
                 await categoria.save();
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
            let categoria = new Categoria(body);
        
            try {

                   //img
                   const util = new UtilsService();
                   const image = await util.uploadImage(request, '/menu');
                     if(image) {
                        categoria.file = image;
                       notifications.push({
                         status      : true,
                         message     : 'Upload image successfully'
                      })
                    }
  

                await categoria.save();
    
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

        let categorias = await this.getmenucategory(request);
        return view.render('cms.pages.nutricions.menu-categories.index',{
            categorias    : categorias.toJSON(),
            notifications : notifications,
                   edit   : edit

        })
    }

    //Eliminar
    async delete(id) {
        let categoria = await Categoria.find(id)
        return categoria ? categoria.delete() : categoria
    }

}

module.exports = MenuCategoryController
