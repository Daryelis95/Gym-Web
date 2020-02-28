'use strict'

class CmsRetoImage {

    get rules() {

		return {
            //title   : 'required|min:3|max:255',
            file    : 'required|file_ext:png,jpg|file_size:4mb|file_types:image'
		}
	}

    get messages() {

        return {
            'file.required'         : 'Invalid file',
            'file.file'             : 'Invalid file',
            'file.file_ext'         : 'File type must be PNG or JPG',
            'file.file_size'        : 'File size bigger than 4 MB',
            'file.file_types'       : 'It is not image file'
        }
    }

    async fails(errorMessages) {

        this.ctx.session
            .flash({ form : 'Please check your form data' })
            .withErrors(errorMessages)
            .flashAll()

        return this.ctx.response.route('cms.nutricions.recetas.images', this.ctx.request.all())
    }
}

module.exports = CmsRetoImage
