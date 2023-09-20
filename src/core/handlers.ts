import type { Request, Response, NextFunction } from 'express'
import type { IFormModel } from 'axp-ts'

import { z } from 'zod'
import { DataResultEntity } from 'axp-ts'

import { HttpError } from './errors'

/**
 * Основной обработчик ошибок.
 */
export const resultHandler = (
	result: any,
	{}: Request,
	res: Response,
	{}: NextFunction
) => {
	const dR = new DataResultEntity()

	if (result instanceof HttpError) {
		dR.status = result.status
		dR.message = result.message
		dR.errors = result.errors
	} else if (result instanceof Error) {
		dR.status = 500
		dR.message = 'Server Error'
		dR.errors.push({ code: 'server', text: result.message })
	} else {
		dR.status = result.status || 520
		dR.message = result.message || 'Unknown Error'

		if (result.info) dR.info = result.info
		if (result.data) dR.data = result.data

		const { errors = [] } = result
		if (Array.isArray(errors)) {
			for (const error of errors) {
				const { code = 'error', text } = error
				dR.errors.push({ code, text })
			}
		}
	}

	res.status(dR.status).json(dR)
}

/**
 * Обработчик 404 ошибки.
 */
export const api404Handler = (
	{}: Request,
	{}: Response,
	next: NextFunction
) => {
	next(
		new HttpError({
			statusCode: 404,
			code: 'not_found',
			text: 'Resource api not found'
		})
	)
}

/**
 * Аргументы валидации Zod схем.
 */
export type TZodMiddleArgs = {
	query?: z.ZodSchema
	params?: z.ZodSchema
	body?: z.ZodSchema
}

/**
 * Валидация zod схем.
 */
export const zodMiddle =
	(schemas: TZodMiddleArgs) =>
	(req: Request, {}: Response, next: NextFunction) => {
		try {
			if (schemas.query) req.query = schemas.query.parse(req.query)
			if (schemas.params) req.params = schemas.params.parse(req.params)
			if (schemas.body) req.body = schemas.body.parse(req.body)

			next()
		} catch (ex: any) {
			ex as z.ZodError
			const httpError = new HttpError({ statusCode: 400 })

			for (const issue of ex.issues) {
				const code = issue.path.toString().replaceAll(',', '-')
				httpError.errors.push({ code, text: code + ' - ' + issue.message })
			}

			next(httpError)
		}
	}

export const validFormMiddle =
	(model: IFormModel<any>) =>
	(req: Request, {}: Response, next: NextFunction) => {
		if (model.isValid()) {
			req.body = model.obj
			next()
		} else {
			const httpError = new HttpError({ statusCode: 400 })
			httpError.errors = model.errors
			next(httpError)
		}
	}
