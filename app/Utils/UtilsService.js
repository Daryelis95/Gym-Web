const Helpers = use('Helpers')

class UtilsService {

    async uploadImage(request, path) {
        let file = request.file('file', {
            types   : [ 'image' ],
            size    : ['4mb'],
            extnames: ['png', 'gif', 'jpg', 'jpeg']
        })

        if(file) {
            let name    = file.clientName
            let ext     = name.split('.')[1]
            let uuid = await this.getUUID();
            name        = uuid + '.' + ext

            await file.move(Helpers.publicPath('./uploads' + path), {
                name: name,
                overwrite: true
            })
        
            if (!file.moved()) {
                return file.error()
            }
            return '/uploads' + path + '/' + name
        }
        return
        
    }

    async getUUID() {

        let d = new Date().getTime();
        let uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    } 

}
module.exports = UtilsService
