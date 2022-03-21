import config from '../config'

/**
 * Хелпер URL.
 */
class UrlHelper {
  getUrl(str: string) {
    return config.baseUrl + str.replace(/^\//, '')
  }
  getUrlStatic(str: string): string {
    return this.getUrl(config.paths.static) + '/' + str.replace(/^\//, '')
  }
}

// Экспорт модуля.
export default new UrlHelper()
