import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'

export default defineConfig({
	input: 'src/index.ts',
	output: {
		dir: 'dist',
		format: 'es'
	},
	external: ['path', 'axp-ts', 'dotenv', 'express', 'mongoose'],
	plugins: [typescript()]
})
