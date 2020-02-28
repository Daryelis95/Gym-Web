'use strict'

class CmsLearnings {

    get rules() {

		return {
            title       : 'required|min:5|max:255',
            content     : 'required|min:5',
            price       : 'required',
            file        : 'file_ext:png,jpg|file_size:4mb|file_types:image'
		}
	}

    get messages() {

        return {
            'title.required'        : 'Invalid title',
            'title.min'             : 'Title must bigger than 4 character',
            'title.max'             : 'Title must smaller than 32 character',
            'content.required'      : 'Invalid content',
            'content.min'           : 'Content must bigger than 4 character',
            'price.required'        : 'Price is required',
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

        return this.ctx.response.route('cms.learning', this.ctx.request.all())
    }
}

module.exports = CmsLearnings
