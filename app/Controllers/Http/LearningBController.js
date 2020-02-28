'use strict'
const Learning  = use('App/Models/LearningB')
const Logger     = use('Logger')
const Helpers = use('Helpers')
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const path = require('path')
const morgan = require('morgan')
const multer = require('multer')

class LearningBController{
  
  async index ({ request, response, view , params}) {
     //utilizar modelo
    const learnings = await Learning.all()

    return view.render('pages.aprendizajes.index2' , {

      learnings:learnings.toJSON()

    })

 /*   let notifications   = [];

    let page = request.input('page', 1);

    let query = { deleted_at: null }

        if(request.input('keyword')) {
            query.title =  { $regex : request.input('keyword') }
        }

        let learnings = await Learning
            .query()
            .where(query)
            .paginate(page)
            
        return view.render('cms.pages.learning.index2', {
          learnings       : learnings.toJSON(),
          notifications   : notifications
      });*/
  }

 /**Agregar */
  async add ({ request, response, view }) {

    return view.render('cms.pages.learning.part-form2')
  }


  async store ({ request, response , view}) {

    app.use(express.json());

    app.use(express.urlencoded({extended : true}));

    morgan.use(morgan('dev'));
   //ubicacion
    let dest;
    dest = path.resolve(__dirname  , '..', '..' , 'public' , 'uploads')

    Storage = multer.diskStorage({

      destination : (request , file ,cb){
        cb(null , path.resolve(__dirname  , '..', '..' , 'public' , 'uploads'));
      }
      //cambiar nombre
      filename:(request , file , cb) {

        cripto.randomBytes(16 , (err , hash){

          if(err) cb(err);

          const fileName = '${hash.toString('hex')}-${file.originalname}'
          cb(null , fileName);
        })

      }

    })

    //limite condiciones
    limits = {

      fileSize= 4 * 1024 * 1024
    }

    fileFilter(request , file , cb){
      allowedMimes = [
        'image/png',
        'image/gif',
        'image/jpg', 
        'image/jpeg'
      ];

      if(allowedMimes.includes(file.mimetype)){

        cb(null , true);

      } else{
        cb(new error('tipo de archivo invalido'))
      }
    }

    
  }

 
  async show ({ params, request, response, view }) {
  }


  async edit ({ params, request, response, view }) {
  }

  /**
   * Update learningb details.
   * PUT or PATCH learningbs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a learningb with id.
   * DELETE learningbs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = LearningBController
