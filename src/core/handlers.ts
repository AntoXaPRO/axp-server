import { Request, Response, NextFunction } from 'express'
import { DataResultEntity } from 'axp-ts'

const statusCodes = [
  { code: 400, message: 'Validation Error' },
  { code: 401, message: 'Auth Error' },
  { code: 403, message: 'Access Error' },
  { code: 404, message: 'Not found' }
]

const getStatusMessage = (code: number) => {
  return statusCodes.find((e) => e.code === code)?.message || 'Server Error'
}

/**
 * Основной обработчик ошибок.
 */
export const errorsHandler = (
  err: any,
  {}: Request,
  res: Response,
  {}: NextFunction
) => {
  const {
    message = 'Etc error',
    statusCode = 500,
    statusMessage = undefined,
    code = 'server',
    text = undefined
  } = err
  const dR = new DataResultEntity<null>()
  dR.status = statusCode
  dR.message = statusMessage || getStatusMessage(statusCode)
  dR.errors.push({ code, text: text || message })
  res.status(dR.status).json(dR)
}

/**
 * Обработчик 404 ошибки.
 */
export const api404Handler = ({}: Request, {}: Response, next: NextFunction) => {
  next({ statusCode: 404, code: 'not_found', text: 'Resource api not found' })
}
