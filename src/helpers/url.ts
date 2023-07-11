import { config } from '../config'

/**
 * Хелпер URL.
 */
export class UrlHelper {
	getUrl(str: string) {
		return config.baseUrl + str.replace(/^\//, '')
	}
	getUrlStatic(str: string): string {
		return this.getUrl(config.paths.static) + '/' + str.replace(/^\//, '')
	}
}

export default new UrlHelper()
