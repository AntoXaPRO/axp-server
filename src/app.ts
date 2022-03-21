import express, { Express, Router } from 'express'

import { AppModule } from '.'
import config from './config'
import { api404Handler } from './core/handlers'

export default async (modules: typeof AppModule[] = []): Promise<Express> => {
  // Express.
  const app = express()
  const apiRouter = Router()

  // Возвращаем промис.
  return new Promise<Express>(async (resolve) => {
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

    resolve(app)
  })
}
