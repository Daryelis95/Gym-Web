'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
const Logger = use('Logger')

class ExceptionHandler extends BaseExceptionHandler {

	async handle(error, { request, response, session }) {

        response.status(error.status).send(error.message)

        switch(error.name) {

            /*
            | Bu handler InvalidSessionException hatası durumunda cms.login
            | route'a yönlendirme yapacak.
            */

            case 'InvalidSessionException':

                session.withErrors(error.messages).flashAll()
                await session.commit()

                Logger.error('Invalid Session Exception')

                response.route('main')
                return

            break

			default:

			break;
        }

        return super.handle(...arguments)
	}

	async report(error, { request }) {

	}
}

module.exports = ExceptionHandler
