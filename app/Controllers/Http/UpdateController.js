'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

class UpdateController {
    async index({request, auth, response}) {

            
        let user = await User.findBy('email', auth.user.email);

        user.nick = request.input('nick')
        user.name = request.input('name') ? request.input('name') : auth.user.name;
        user.age = request.input('age')
        user.country = request.input('country')
        user.email = request.input('email') ? request.input('email') : auth.user.email;
        user.gender = request.input('gender') ? request.input('gender') : auth.user.gender;
        user.weight = request.input('weight')
        user.height = request.input('height')
        user.facebook = request.input('facebook')
        user.instagram = request.input('instagram')
        user.twitter = request.input('twitter')

        try {

            await user.save();
            response.route('perfil');
            return

        }
        catch(error) {

            notifications.push({
                status      : false,
                message     : 'User has not been update'
            })

        }
    }

    async changePassword({request, auth, response}) {
        let user = await User.findBy('email', auth.user.email);

        let verifyPass = await Hash.verify(
            request.input('password'),
            user.password
            )

        if(!verifyPass) {
            
        }
        
        const pass1 = await request.input('pass1')
        const pass2 = await request.input('pass2')

            if(pass1 == pass2){ 
                user.password = request.input('pass1')

            try {

                await user.save()

                response.route('perfil');
                return
    
            }
            catch(error) {
    
                notifications.push({
                    status      : false,
                    message     : 'User Password has not update'
                })
    
            }
        }else{
             notifications.push({
                    status      : false,
                    message     : 'User Password has not update'
                })
        }
    }

    async updateWeight({request, auth, response}) {

            
        let user = await User.findBy('email', auth.user.email);

        const days = user.graphDay || [];
        const months = user.graphMonth || [];
        const weights = user.graphWeight || [];

        if(request.input('weight')){
            user.graphWeight = [ ...weights, parseInt(request.input('weight'))]
            user.graphDay = [...days, parseInt(request.input('selectDay'))]
            user.graphMonth = [ ...months, request.input('selectMonth')]
        } 
        
        try {

            await user.save();
            response.route('perfil');
            return

        }
        catch(error) {

            notifications.push({
                status      : false,
                message     : 'User has not been update'
            })

        }
    }

    async deleteWeight({request, auth, response}) {
 
        let user = await User.findBy('email', auth.user.email);

        const days = user.graphDay || [];
        const months = user.graphMonth || [];
        const weights = user.graphWeight || [];

        const id = parseInt(request.input('deleteWeight'))  

        weights.splice(id, 1)
        days.splice(id, 1)
        months.splice(id, 1)
        
        user.graphWeight = weights[0] ? weights : null
        user.graphDay = days[0] ? days : null
        user.graphMonth = months[0] ? months : null

        
        try {

            await user.save();
            response.route('perfil');
            return

        }
        catch(error) {

            notifications.push({
                status      : false,
                message     : 'User has not been update'
            })

        }
    }

    async addMedida({request, auth, response}) {
            
        let user = await User.findBy('email', auth.user.email);

        let medidas = user.medidas || []

        let oneMedida = {
            fecha: request.input('fecha'),
            biceps: request.input('biceps'),
            pecho: request.input('pecho'),
            cinturaAlta: request.input('cinturaAlta'),
            cinturaBaja: request.input('cinturaBaja'),
            cadera: request.input('cadera'),
            muslo: request.input('muslo'),
            id: generateUUID()
        }

        medidas.push(oneMedida)

        user.medidas = medidas
        
        try {

            await user.save();
            response.route('perfil');
            return

        }
        catch(error) {

            notifications.push({
                status      : false,
                message     : 'User has not been update'
            })

        }
    }

    async deleteMedida({request, auth, response}) {
 
        let user = await User.findBy('email', auth.user.email);

        let id = request.input('deleteMedida');

        let medidas = user.medidas;

        for (let index = 0; index < medidas.length; index++) {
            
            if(medidas[index].id == id) {
                medidas.splice(index, 1)
            }
            
        }

        user.medidas = medidas
        
        try {

            await user.save();
            response.route('perfil');
            return

        }
        catch(error) {

            notifications.push({
                status      : false,
                message     : 'User has not been update'
            })

        }
    }
}

module.exports = UpdateController
