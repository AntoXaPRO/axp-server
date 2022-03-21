import dotenv from 'dotenv'

// Конфиг приложения.
export type TConfig = {
  isDev: boolean
  port: number
  baseUrl: string
  basePath: string
  dirs: {
    static: string
  },
  paths: {
    api: string
    static: string
  },
  getParam: (name: string) => string
}

// Инициализация.
dotenv.config()

// Конфигурация по умолчанию.
const {
  NODE_ENV = 'production',
  PORT = '4000',
  BASE_URL = '/',
  PATH_API = '/api',
  PATH_STATIC = '/static',
  DIR_STATIC = 'public',
} = process.env

const isDev = NODE_ENV === 'development'
const port = Number.parseInt(PORT)
const baseUrl = isDev ? 'http://localhost:' + port + '/' : BASE_URL

// Кофигурация.
const config: TConfig = {
  isDev,
  port,
  baseUrl,
  basePath: process.cwd(),
  dirs: {
    static: DIR_STATIC
  },
  paths: {
    api: PATH_API,
    static: PATH_STATIC
  },
  getParam: (name: string) => {
    return process.env[name]?.toString() || ''
  }
}

/*
Экспорт модуля. */
export default config
