const Helpers = use('Helpers')

class MenuService {

    async create({request, auth, view, params}){

        let notifications = [];
      
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
               menu.semana = body.semana;
               menu.dia = body.dia;
            
        }
        } 
        else {
            let menu = new Menu(body);
        
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
        return
    
    }
}
module.exports = MenuService