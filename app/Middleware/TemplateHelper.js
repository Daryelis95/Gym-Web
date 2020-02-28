'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @typedef {import('@moment')} moment */

const moment = require('moment')

class TemplateHelper {

	async handle({ request }, next) {

        const View = use('View')

		/*
		| URL karşılaştırması yapan helper. URL pattern uyumlu ise belirtilen
		| selector içeriğini dönüyor.
		*/

        View.global('isActiveRoute', (url, selector) => {

            selector = selector ? selector : 'active-element';
            return request.url().match(url) ? selector : ''
        })

		/*
		| Tarih formatlamak içi kullanılan helper.
		*/

		View.global('humanDate', (date, format) => {

			return moment(date).format(format ? format : 'DD.MM.YYYY H:m')
		})

		/*
		| Pagination yardımcı fonksiyonları.
		*/

		View.global('getNextPageURL', (params) => {

			return params.page < params.lastPage ? request.url() + '?page=' + (params.page + 1) : request.url()
		})

		View.global('getPrevPageURL', (params) => {

			return params.page > 1 ? request.url() + '?page=' + (params.page - 1) : request.url()
		})

		/*
		| String yardımcı fonksiyonları.
		*/

		View.global('echo', (param, limit, suffix) => {

			if(param == null || param == undefined) {
				return ''
			}

			if(typeof param == 'string' || typeof param == 'number')  {

				if(typeof param == 'string' && limit) {

					if(param.length > limit) {
						param = param.substr(0, param.indexOf(' ', limit))
						+ (suffix == undefined || suffix === true ? '...' : (suffix === false ? '' : suffix)) 
					}
				}

				return param
			}

			/*if(typeof param == 'object')  {
				return JSON.stringfy(param)
			}*/

			return param
		})

		await next()
	}
}

module.exports = TemplateHelper
