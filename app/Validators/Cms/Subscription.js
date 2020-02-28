'use strict'

class CmsSubscription {

    get rules() {

		return {
            title       : 'required|min:5|max:255',
            content     : 'required|min:5',
            price       : 'required',
            type        : 'required'
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
            'type.required'         : 'Type is required'
        }
    }

    async fails(errorMessages) {

        this.ctx.session
            .flash({ form : 'Please check your form data' })
            .withErrors(errorMessages)
            .flashAll()

        return this.ctx.response.route('cms.subscriptions', this.ctx.request.all())
    }
}

module.exports = CmsSubscription
