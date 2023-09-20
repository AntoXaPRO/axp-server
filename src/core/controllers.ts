import { Response } from 'express'
import { DataResultEntity } from 'axp-ts'

/**
 * Базовый контроллер.
 * @deprecated
 */
export class BaseController {
	/**
	 * Отправка результата от сервера.
	 */
	sendRes<T>(res: Response, dR: DataResultEntity<T>): void {
		res.status(dR.status).json(dR)
	}

	/**
	 * Выполнение и обработка промиса с действием.
	 * Всегда положительный результат выполнения промиса.
	 */
	exec<T>(
		fn: () => Promise<T>,
		args?: { res?: Response }
	): Promise<DataResultEntity<T>> {
		return new Promise<DataResultEntity<T>>(async resolve => {
			// Модель данных для возврата.
			const dR = new DataResultEntity<T>()

			// Выполнение действия.
			try {
				const data = await fn()
				if (data) {
					dR.setData(data)
				} else {
					// Ресурс не найден.
					dR.status = 404
					dR.message = 'Not found'
					dR.errors.push({ code: 'nod_found', text: 'Resource not found' })
				}
			} catch (ex: any) {
				// Ошибка сервера.
				dR.status = 500
				dR.message = 'Server Error'
				dR.errors.push({ code: 'error_exec', text: ex.message })
			}

			// Отправляем ответ сервера.
			if (args?.res) {
				this.sendRes(args.res, dR)
			}

			// Результат.
			resolve(dR)
		})
	}
}
