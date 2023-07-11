import { TNotificationItem } from 'axp-ts'

/**
 * Тип - Http ошибка.
 */
export type THttpError = {
	status: number
	message: string
	errors: TNotificationItem[]
}

/**
 * Http ошибка.
 */
export class HttpError implements THttpError {
	status: number = 500
	message: string = 'Server Error'
	errors: TNotificationItem[] = []

	constructor(args?: { text?: string; code?: string; statusCode?: number }) {
		this.status = args?.statusCode || 500
		this.message = this.getStatusMessage(this.status)
		if (args?.text) {
			this.errors.push({ code: args.code || 'error', text: args.text })
		}
	}

	/**
	 * Возвращает название ошибки.
	 */
	getStatusMessage(status: number) {
		const messages = [
			{ status: 400, value: 'Validation Error' },
			{ status: 401, value: 'Auth Error' },
			{ status: 403, value: 'Access Error' },
			{ status: 404, value: 'Not found' },
			{ status: 500, value: 'Server Error' },
			{ status: 520, value: 'Unknown Error' }
		]

		const message = messages.find(e => e.status === status)

		if (message) {
			return message.value
		} else {
			return 'Unknown Error'
		}
	}
}
