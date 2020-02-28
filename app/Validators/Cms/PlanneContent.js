'use strict'

class CmsPlanneContent {

    get rules() {

		return {
            content_id  : 'required',
            planne_id   : 'required',
            content_type: 'required'
		}
	}

    get messages() {

        return {
            'content_id.required'   : 'Invalid content',
            'planne_id.required'    : 'Invalid planne',
            'content_type.required' : 'Invalid content type',
        }
    }

    async fails(errorMessages) {

        this.ctx.session
            .flash({ form : 'Please check your form data' })
            .withErrors(errorMessages)
            .flashAll()

        return this.ctx.response.route('cms.plannes.contents', this.ctx.request.all())
    }
}

module.exports = CmsPlanneContent
