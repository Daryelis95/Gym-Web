'use strict'

class CmsReto {

    get rules() {

		return {
            title       : 'required|min:5|max:255',
            ingredients : 'required|min:5',
            category_id : 'required',
            file        : 'file_ext:png,jpg|file_size:4mb|file_types:image'
		}
	}

    get messages() {

        return {
            'title.required'        : 'Invalid title',
            'title.min'             : 'Title must bigger than 4 character',
            'title.max'             : 'Title must smaller than 32 character',
            'ingredients.required'  : 'Invalid content',
            'ingredients.min'       : 'Content must bigger than 4 character',
            'category_id.required'  : 'Invalid category',
            'file.file'             : 'Invalid file',
            'file.file_ext'         : 'File type must be PNG or JPG',
            'file.file_size'        : 'File size bigger than 4 MB',
            'file.file_types'       : 'It is not image file'
        }
    }

    async fails(errorMessages) {
console.log(errorMessages);
        this.ctx.session
            .flash({ form : 'Please check your form data' })
            .withErrors(errorMessages)
            .flashAll()

        return this.ctx.response.route('cms.nutricions.recetas', this.ctx.request.all())
    }
}

module.exports = CmsReto
