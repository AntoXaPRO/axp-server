// Конфигирация.
import config, { TConfig } from './config'

// Модуль приложения.
import AppModule, {
  TAppModuleInitContext,
  TRegisterRouter
} from './core/app-module'

// Обработчики.
import * as handlers from './core/handlers'

// Контроллеры.
import BaseController from './core/base-controller'

// Хелперы.
import urlHelper from './helpers/url'
import pathHelper from './helpers/path'

// Приложение.
import app from './app'

// Экспорт модулей.
export {
  TConfig,
  config,
  AppModule,
  TAppModuleInitContext,
  TRegisterRouter,
  BaseController,
  handlers,
  urlHelper,
  pathHelper
}

// Экспорт приложения.
export default app
