import path from 'path'
import { config } from '../config'

/**
 * Хелпер PATH.
 */
export class PathHelper {
	getPath(str: string): string {
		return path.join(config.basePath, str)
	}
	getPathStatic(str: string): string {
		return path.join(this.getPath(config.dirs.static), str)
	}
}

export default new PathHelper()
