'use strict'

const Receta = use('App/Models/Cms/Menu')
const RecetaCategoria = use('App/Models/Cms/Categoria')


class RecetaController {

     /*+++++++++++++++ RECETA+++++++++*/
    async getreceta(request){
        
        let page        = request.input('page', 1);
        let query       = { deleted_at: null} 

        if(request.input('keyword')) {
            query.title =  { $regex : request.input('keyword') }
        }

        return Receta
            .query()
            .where(query)
            
            .paginate(page)
    }
   

    /*************************************RECETAS CATEGORIA******************************************** */
    async getCategoria(request){

        let page        = request.input('page', 1);
        let query       = { deleted_at: null} 

        if(request.input('keyword')) {
            query.title =  { $regex : request.input('keyword') }
        }

        return RecetaCategoria
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
            edit = await Receta.find(params.id); //editar
        }

       
          
        let recetas = await this.getreceta(request);
        let categorias = await this.getCategoria(request);

        return view.render('pages.nutricions.recetas.index',{
            categorias      : categorias.toJSON(),
            recetas         :recetas.toJSON(),
            notifications   :notifications,
            edit            :edit,
            headerImage : 'img/header-image-3.png'
        })

        
            
        
    }
    //agrega and editar
    async createRecetas({request, auth, view, params, response}){
       
        let notifications = [];
        
        let edit = null;
      
        let body = request.all();
        
        if(body.id) {

         let receta = await Receta.find(body.id);
            if(receta) {

                receta.title = body.title;
                receta.semana = body.semana;
                receta.descripcion = body.descripcion;
                receta.desayuno = body.desayuno;
                receta.mediamanana = body.mediamanana;
                receta.comida = body.comida;
                receta.mediatarde = body.mediatarde;
                receta.cena = body.cena;
                receta.dia = body.dia;

              try {
                 await receta.save();
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
            let receta = new Receta(body);
        
            try {

                await receta.save();
        
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

        let recetas = await this.getreceta(request);

        return view.render('pages/nutricions/recetas/index',{
            recetas : recetas.toJSON(),
            notifications:notifications,
            edit: edit

        })
    }

    async delete(id) {
    
        let receta = await Receta.find(id)
    
        return receta ? receta.delete() : receta
   }
  
   async menudetalles({request , view}){
      return view.render('pages.nutricions.recetas.receta-detail')
   }
   
   
}
module.exports = RecetaController