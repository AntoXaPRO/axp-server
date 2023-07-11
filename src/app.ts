import type { Express } from 'express'
import express, { Router } from 'express'

import { config } from './config'
import { AppModule } from './core/app-module'
import { api404Handler, resultHandler } from './core/handlers'

export default async (
	modules: (typeof AppModule)[] = []
): Promise<Express> => {
	// Express.
	const app = express()
	const apiRouter = Router()
	const logPrefix = AppModule.logPrefix

	// Инициализация модулей.
	console.log('Инициализация модулей:')
	for (const ModuleInstance of modules) {
		try {
			const module = new ModuleInstance({ app, apiRouter })
			console.log(logPrefix, module.name)
			await module.init()
		} catch (ex: any) {
			console.error(logPrefix, '[X]', 'Error init app module:', ex.message)
		}
	}

	// Регистрация роутера API.
	console.info('Регистрация роутера АПИ')
	app.use(config.paths.api, apiRouter)
	app.use(config.paths.api + '/*', api404Handler)
	app.use(resultHandler)

	// Возвращаем инстанс.
	return app
}
