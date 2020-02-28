'use strict'

class CmsRetoSubCategory {

    get rules() {

		return {
            title   : 'required|min:3|max:255',
            file    : 'file_ext:png,jpg|file_size:4mb|file_types:image',
            category_id : 'required'
		}
	}

    get messages() {

        return {
            'title.required'        : 'Invalid title',
            'title.min'             : 'Title must bigger than 4 character',
            'title.max'             : 'Title must smaller than 32 character',
            'file.file'             : 'Invalid file',
            'file.file_ext'         : 'File type must be PNG or JPG',
            'file.file_size'        : 'File size bigger than 4 MB',
            'file.file_types'       : 'It is not image file',
            'category_id.required'  : 'Invalid category'
        }
    }

    async fails(errorMessages) {

        this.ctx.session
            .flash({ form : 'Please check your form data' })
            .withErrors(errorMessages)
            .flashAll()

        return this.ctx.response.route('cms.nutricions.recetas.subcategories', this.ctx.request.all())
    }
}

module.exports = CmsRetoSubCategory
