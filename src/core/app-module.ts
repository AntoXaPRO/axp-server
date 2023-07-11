import { Express, Router } from 'express'

/**
 * Контекст для метода инициализации модуля.
 */
export type TAppModuleInitContext = {
	app: Express
	apiRouter: Router
}

/**
 * Роутер для регистрации.
 */
export type TRegisterRouter = {
	path: string
	router: Router
}

/**
 * Интерфейс модуля приложения.
 */
export interface IAppModule {
	name: string
	init(): Promise<void>
	registerRoutes(items: TRegisterRouter[]): void
}

/**
 * Модуль приложения.
 */
export class AppModule implements IAppModule {
	name: string = 'Модуль'
	static logPrefix: string = '|-'

	protected _context: TAppModuleInitContext

	constructor(context: TAppModuleInitContext) {
		this._context = context
	}

	/**
	 * Инициализация модуля.
	 */
	async init() {
		throw new Error(this.name + ' - requires implementation init()')
	}

	/**
	 * Регистрация маршрутов.
	 */
	registerRoutes(items: TRegisterRouter[]): void {
		for (const item of items) {
			this._context.apiRouter.use(item.path, item.router)
		}
	}
}
