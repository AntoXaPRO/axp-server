import { Response } from 'express'
import { DataResultEntity, IValidEntity } from 'axp-ts'

/**
 * Модель данных для обработки исключений внутри выполнения
 * промисов с действием.
 */
// export type TControllerEx = {
//   status: number
//   message: string
//   errorCode: string
// }

/**
 * Базовый контроллер.
 */
class BaseController {
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
    return new Promise<DataResultEntity<T>>(async (resolve) => {
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
        dR.errors.push({ code: 'server_exec', text: ex.message })
      }

      // Отправляем ответ сервера.
      if (args?.res) {
        this.sendRes(args.res, dR)
      }

      // Результат.
      resolve(dR)
    })
  }

  /**
   * Выполнение и обработка промиса с действием и валидацией данных.
   * Всегда положительный результат выполнения промиса.
   */
  execValid<TForm, TModel>(
    model: IValidEntity<TForm>,
    fn: (obj: TForm) => Promise<TModel | null>,
    args?: {
      res?: Response
      successStatus?: number
    }
  ) {
    return new Promise(async (resolve) => {
      const dR = new DataResultEntity<TModel>()

      if (model.isValid()) {
        const obj = model.convertPreSave()
        try {
          const data = await fn(obj)
          if (data) {
            dR.setData(data)
          }
          dR.status = args?.successStatus || 200
        } catch (ex: any) {
          // Ошибка сервера.
          dR.status = 500
          dR.message = 'Server Error'
          dR.errors.push({ code: 'server_exec', text: ex.message })
        }
      } else {
        dR.status = 400
        dR.message = 'Error validate'
        dR.errors = model.errors
      }

      if (args?.res) {
        this.sendRes(args.res, dR)
      }

      resolve(dR)
    })
  }
}

// Экспорт модуля.
export default BaseController
