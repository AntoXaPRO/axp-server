import dotenv from 'dotenv'

// Конфиг приложения.
export type TConfig = {
	isDev: boolean
	port: number
	baseUrl: string
	basePath: string
	dirs: { static: string }
	paths: { api: string; static: string }
	getParam: (name: string) => string
}

// Инициализация.
dotenv.config()

// Конфигурация по умолчанию.
const {
	NODE_ENV = 'production',
	PORT = '4000',
	BASE_URL = '/',
	BASE_PATH = process.cwd(),
	PATH_API = '/api',
	PATH_STATIC = '/static',
	DIR_STATIC = 'public'
} = process.env

const isDev = NODE_ENV === 'development'
const port = Number.parseInt(PORT)
const baseUrl = isDev ? 'http://localhost:' + port + '/' : BASE_URL
const basePath = BASE_PATH

// Кофигурация.
export const config: TConfig = {
	isDev,
	port,
	baseUrl,
	basePath,
	dirs: { static: DIR_STATIC },
	paths: { api: PATH_API, static: PATH_STATIC },
	getParam: (name: string) => process.env[name]?.toString() || ''
}
