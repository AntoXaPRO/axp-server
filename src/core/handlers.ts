import { Request, Response } from 'express'
import { DataResultEntity } from 'axp-ts'
import BaseController from './base-controller'

/**
 * Обработчик 404 ощибки.
 */
export const api404Handler = (req: Request, res: Response) => {
  const baseCtrl = new BaseController()
  const dR = new DataResultEntity()
  dR.status = 404
  dR.message = 'Not found'
  dR.errors.push({ code: 'not_found', text: 'Resource not found' })
  baseCtrl.sendRes(res, dR)
}
