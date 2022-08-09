import { defineConfig, Plugin } from 'vite'
import path from 'path'
import handlebars from 'vite-plugin-handlebars'
import glsl from 'vite-plugin-glsl'

export default defineConfig(({ mode }) => {
	console.log('⚓ ' + mode)
	return {
		root: './src',
		base: mode === 'development' ? '/' : '/three-learn/',
		publicDir: '../public',
		plugins: [
			handlebars({
				partialDirectory: path.resolve(__dirname, './src/partials/'),
				helpers: {
					concat: (...params: unknown[]) => params.filter((param) => typeof param === 'string' && !!param).join(' '),
					is: (a: unknown, b: unknown) => (a ? b : null),
					eq: (a: unknown, b: unknown) => a === b,
					fallback: (a: unknown, b: unknown) => a ?? b,
					padZero: (val: unknown, maxLength: number) =>
						String(val).padStart(typeof maxLength === 'number' ? maxLength : 2, '0'),
					times: (number: number, block: any) => [...Array(number)].reduce((acc, _, i) => `${acc}${block.fn(i)}`, ''),
					add: (a: number, b: number) => a + b
				}
			}) as Plugin,
			glsl()
		],
		build: {
			rollupOptions: {
				input: {
					home: path.resolve(__dirname, './src/index.html'),
					step1: path.resolve(__dirname, './src/step1/index.html'),
					step2: path.resolve(__dirname, './src/step2/index.html'),
					step3: path.resolve(__dirname, './src/step3/index.html'),
					step4: path.resolve(__dirname, './src/step4/index.html'),
					step5: path.resolve(__dirname, './src/step5/index.html'),
					step6: path.resolve(__dirname, './src/step6/index.html'),
					step7: path.resolve(__dirname, './src/step7/index.html')
				}
			},
			outDir: '../dist',
			cssCodeSplit: false,
			emptyOutDir: true
		},
		server: {
			host: true
		}
	}
})
