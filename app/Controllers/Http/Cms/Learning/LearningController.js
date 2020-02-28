'use strict'

const Learning    = use('App/Models/Cms/Learning')
const Helpers = use('Helpers')
const UtilsService = use('App/Utils/UtilsService')

class LearningController {

    async index({ request, auth, view, params }) {
        let notifications   = [];
        let edit = null;

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
        
        }else if(params.method=='edit') {

            edit = await Learning.find(params.id);
        }      

        let learnings = await this.getLearnings(request);
        return view.render('cms.pages.learning.blog.index', {
            learnings       : learnings.toJSON(),
            notifications   : notifications,
            edit: edit
        });
    }

    async transaction({request, auth, view, params}){
        let body = request.all();
        console.log(body)
        let notifications   = [];
        if(body.id) {
            let learning = await Learning.find(body.id);
            if(learning) {
                learning.title = body.title;
                learning.maintitle = body.maintitle;
                learning.description = body.description;
                learning.status = body.status;
                learning.file = body.file;
                //img
                const util = new UtilsService();
                const image = await util.uploadImage(request, '/learning');
                if(image) {
                    learning.file = image;
                    notifications.push({
                        status      : true,
                        message     : 'Upload image successfully'
                    })
                }
                try {
                    await learning.save();
                    notifications.push({
                        status      : true,
                        message     : 'Category has been edited successfully'
                    })
                }
                catch(error) {

                    notifications.push({
                        status      : false,
                        message     : 'Category has not been edited'
                    })
                }

                
            }
        }else {
            let learning = new Learning(body);
        
            try {

                  //img
                 const util = new UtilsService();
                 const image = await util.uploadImage(request, '/learning');
                   if(image) {
                     learning.file = image;
                     notifications.push({
                       status      : true,
                       message     : 'Upload image successfully'
                    })
                  }

                await learning.save();

                notifications.push({
                    status      : true,
                    message     : 'New Category has been added successfully'
                })
            }
            catch(error) {

                notifications.push({
                    status      : false,
                    message     : 'New Category has not been added'
                })
            }
              
        }
       
        let learnings = await this.getLearnings(request);

        return view.render('cms.pages.learning.blog.index', {
            learnings       : learnings.toJSON(),
            notifications   : notifications,
        });
    }

    /*async edit({request, auth, view, params}) {
        let body = request.all();
        let learning = await Learning.find(params.id);

        learning.title = body.title;
        learning.maintitle = body.maintitle;
        learning.description = body.description;
        learning.status = body.status;

        await learning.save();

        let learnings = await this.getLearnings(request);

        
        
        return view.render('cms.pages.learning.blog.index', {
            learnings       : learnings.toJSON(),
            notifications   : notifications,
        });
    }*/

    async delete(id) {
        let learning = await Learning.find(id)
        return learning ? learning.delete() : learning
    }
    

    async getLearnings(request) {
        let page = request.input('page', 1);

        let query = { deleted_at: null }

        if(request.input('keyword')) {
            query.title =  { $regex : request.input('keyword') }
        }

        return Learning
            .query()
            .where(query)
            .orderBy('_id','desc')
            .paginate(page)

    }

    
    async storage(request , response) {

        // default options
        app.use(fileUpload());
         // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
         let file = request.files.file;

         let uploadPath;

       
          if (!request.files || Object.keys(request.files).length === 0) {
           return response.status(400).send('No files were uploaded.');
          }

          console.log('req.files >>>', req.files); // eslint-disable-line

        
          uploadPath = __dirname + './uploads' + file.name;

       // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
          let file = request.files.file;

        // Use the mv() method to place the file somewhere on your server
        
        file.mv(uploadPath , function(error) {
            
         if (error)
         return response.status(500).send(error);

         response.send('File uploaded!'+ uploadPath);

      });
        
    }


    async store({request,auth,response}){
     
        const myPicture = request.file('file',{

            types: ['jpg', 'png', 'jpeg', 'gif'],
            size: '4mb'

        })

        learning.file = new  Date().getTime()+'.'+myPicture.subtype

        await myPicture.move(Helpers.publicPath('uploads/post'),{
            name : learnings.file,
            overwrite : true
        })

        if(!myPicture.moved()){

            return myPicture.error()
        }

        try{
            return myPicture.save()
        
        }catch(error) {

            notifications.push({
                status      : false,
                message     : 'User Profile Picture has not update'
            })
        }
    }

}
module.exports = LearningController