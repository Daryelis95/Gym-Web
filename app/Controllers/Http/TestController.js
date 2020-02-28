'use strict'
const Test = use('App/Models/Test')
const moment = use('moment');

class TestController{

    async get(request) {

        let page = request.input('page', 1);

        let query = { deleted_at: null }

        if(request.input('keyword')) {
            query.title =  { $regex : request.input('keyword') }
        }

        return Test
            .query()
            .where(query)
            .orderBy('_id','desc')
            .paginate(page)


    }

    async index({request , view}){

        let fechas = await  this.get(request);

        return view.render('pages.test.index',{
            fechas : fechas.toJSON(),
            headerImage : 'img/header-image-3.png'


        })

       
        /*let a = moment().week();
        console.log(a);*/


    }

    async menudetalles({request , view}){

        
        return view.render('pages.test.crearmenu-detalles')
    }

   

}
module.exports = TestController

//------------crear una funcion

/*mudule.exports ={

    diaS : diaSemana,
    fecha :() =>   {

       cosole.log('hola'); 

   }
}*/