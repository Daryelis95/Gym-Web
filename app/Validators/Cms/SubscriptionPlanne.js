'use strict'

class CmsSubscriptionPlanne {

    get rules() {

		return {
            subscription_id : 'required',
            planne_id : 'required',
		}
	}

    get messages() {

        return {
            'subscription_id.required'  : 'Invalid scubscription',
            'planne_id.required'        : 'Invalid planne',
        }
    }

    async fails(errorMessages) {

        this.ctx.session
            .flash({ form : 'Please check your form data' })
            .withErrors(errorMessages)
            .flashAll()

        return this.ctx.response.route('cms.subscriptions.plannes', this.ctx.request.all())
    }
}

module.exports = CmsSubscriptionPlanne
